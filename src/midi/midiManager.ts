// src/midi/midiManager.ts

/**
 * MIDIデバイスの管理を行う基底クラス
 */
export class MIDIManager {
  private midiOutput: WebMidi.MIDIOutput | undefined = undefined;
  public onMidiMessageCallback: ((message: WebMidi.MIDIMessageEvent) => void) | undefined =
    undefined;
  private initPromise: Promise<void> | undefined = undefined;
  protected midiAvailable: boolean = false;

  private readonly attachedInputIds: Set<string> = new Set();

  /**
   * MIDIManagerクラスのコンストラクタです。
   * 初期化は init() メソッドを明示的に呼び出すまで開始されません。
   */
  constructor() {
    // 初期化は init() で行う
  }

  /**
   * MIDIの初期化を開始し、完了を待機します。
   * このメソッドを await することで、MIDI接続完了後に処理を続行できます。
   */
  public async init(): Promise<void> {
    if (!this.initPromise) {
      this.initPromise = this.initialize();
    }
    return this.initPromise;
  }

  /**
   * Web MIDI APIの初期化を非同期で行います。
   * まず、ブラウザがWeb MIDI APIをサポートしているかを確認します。
   * サポートされていない場合は警告を出力し、利用不可として処理します。
   * 安定性のために短い待機時間を設けた後、`navigator.requestMIDIAccess` を呼び出して
   * ユーザーにMIDIデバイスへのアクセス許可を求めます。
   * 成功すれば `setupMidi` を呼び出して入出力ポートの設定を行い、
   * 失敗した場合はエラーログを出力して利用不可状態を通知します。
   */
  private async initialize(): Promise<void> {
    // ブラウザのMIDIサポート確認と初期化待ち
    if (!navigator.requestMIDIAccess) {
      console.warn("Web MIDI API is not supported.");
      this.onMidiAvailabilityChanged(false);
      return;
    }

    // 安定性のために少し待機
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const access = await navigator.requestMIDIAccess();
      this.setupMidi(access);
    } catch (err) {
      console.error("MIDI Access Failed:", err);
      this.onMidiAvailabilityChanged(false);
    }
  }

  /**
   * 取得したMIDIAccessオブジェクトを使用して、MIDI入出力ポートの設定を行います。
   * 現在の実装では、最初に見つかった入力ポートと出力ポートを自動的に選択して接続します。
   * 入力ポートが見つかった場合は、`onmidimessage` イベントハンドラを設定し、
   * 受信したMIDIメッセージを `onMidiMessageCallback` に転送するようにします。
   * 出力ポートが見つかった場合は、それを `midiOutput` プロパティに保存し、
   * MIDI送信が可能な状態になったことを `onMidiAvailabilityChanged(true)` で通知します。
   * 出力ポートが見つからない場合は警告を出力し、利用不可状態を通知します。
   *
   * @param access requestMIDIAccessから取得したMIDIAccessオブジェクト。
   */
  private setupMidi(access: WebMidi.MIDIAccess): void {
    const inputs = Array.from(access.inputs.values());
    const outputs = Array.from(access.outputs.values());
    const inputNames = inputs.map((port) => port.name ?? "(unknown)");
    const outputNames = outputs.map((port) => port.name ?? "(unknown)");

    console.log("Available MIDI Inputs:", inputNames);
    console.log("Available MIDI Outputs:", outputNames);

    access.onstatechange = (event) => {
      const port = event.port;
      console.log("MIDI state changed:", {
        name: port.name,
        manufacturer: port.manufacturer,
        type: port.type,
        state: port.state,
        connection: port.connection,
      });
    };

    const preferredInputNames = this.getPreferredInputNames();
    const preferredOutputNames = this.getPreferredOutputNames();

    const input = this.selectPortByName(inputs, preferredInputNames);
    const output = this.selectPortByName(outputs, preferredOutputNames);

    if (input) {
      console.log(`MIDI Input: ${input.name}`);
      this.attachInputListener(input, (msg) => {
        this.onMidiMessageCallback?.(msg);
      });
    } else {
      console.warn("MIDI Input not found.", { preferredInputNames, availableInputs: inputNames });
    }

    if (output) {
      console.log(`MIDI Output: ${output.name}`);
      this.midiOutput = output;
      this.onMidiAvailabilityChanged(true);
    } else {
      console.warn("MIDI Output not found.", {
        preferredOutputNames,
        availableOutputs: outputNames,
      });
      this.onMidiAvailabilityChanged(false);
    }

    this.setupAdditionalInputListeners(inputs);
  }

  /**
   * 主要入力ポートの優先候補名を返します。
   * サブクラスで必要に応じて上書きします。
   */
  protected getPreferredInputNames(): string[] {
    return [];
  }

  /**
   * 主要出力ポートの優先候補名を返します。
   * サブクラスで必要に応じて上書きします。
   */
  protected getPreferredOutputNames(): string[] {
    return [];
  }

  /**
   * 追加で監視する入力ポートを返します。
   * サブクラスで必要に応じて上書きします。
   */
  protected getAdditionalInputListeners(): Array<{
    nameIncludes: string;
    onMessage: (message: WebMidi.MIDIMessageEvent, input: WebMidi.MIDIInput) => void;
  }> {
    return [];
  }

  /**
   * 入力ポートへ重複なくメッセージリスナーを追加します。
   */
  private attachInputListener(
    input: WebMidi.MIDIInput,
    handler: (message: WebMidi.MIDIMessageEvent) => void,
  ): void {
    if (this.attachedInputIds.has(input.id)) {
      return;
    }

    void input
      .open()
      .then(() => {
        console.log(`MIDI Input opened: ${input.name}`);
      })
      .catch((error) => {
        console.warn(`Failed to open MIDI Input: ${input.name}`, error);
      });

    input.addEventListener("midimessage", handler);
    this.attachedInputIds.add(input.id);
  }

  /**
   * 優先候補名に一致するポートを選択します。
   * 一致しなければ先頭ポートを返します。
   */
  private selectPortByName<T extends { name?: string }>(ports: T[], preferredNames: string[]): T | undefined {
    if (ports.length === 0) {
      return undefined;
    }

    if (preferredNames.length === 0) {
      return ports[0];
    }

    const normalizedPreferredNames = preferredNames.map((name) => name.toLowerCase());
    const matched = ports.find((port) => {
      const portName = (port.name ?? "").toLowerCase();
      return normalizedPreferredNames.some((keyword) => portName.includes(keyword));
    });

    return matched;
  }

  /**
   * 追加入力リスナーを設定します。
   */
  private setupAdditionalInputListeners(inputs: WebMidi.MIDIInput[]): void {
    const listeners = this.getAdditionalInputListeners();
    if (listeners.length === 0) {
      return;
    }

    for (const listener of listeners) {
      const keyword = listener.nameIncludes.toLowerCase();
      const matchedInput = inputs.find((input) =>
        (input.name ?? "").toLowerCase().includes(keyword),
      );

      if (!matchedInput) {
        console.warn(`Additional MIDI Input not found: ${listener.nameIncludes}`, {
          availableInputs: inputs.map((port) => port.name ?? "(unknown)"),
        });
        continue;
      }

      this.attachInputListener(matchedInput, (message) => {
        listener.onMessage(message, matchedInput);
      });
      console.log(`Additional MIDI Input: ${matchedInput.name}`);
    }
  }

  /**
   * MIDIメッセージを送信します。
   * 接続されたMIDI出力ポートに対して、指定されたバイト配列（MIDIデータ）を送信します。
   * MIDI出力ポートが未接続の場合は何もしません。
   * ノートオン/オフ、コントロールチェンジなどのMIDIコマンドを送信するために使用されます。
   *
   * @param data 送信するMIDIデータの配列（例: [0x90, 60, 127]）。
   */
  public sendMessage(data: number[]): void {
    if (this.midiOutput) {
      this.midiOutput.send(data);
    }
  }

  /**
   * MIDIデバイスの利用可能性が変化した際に呼び出されるフックメソッドです。
   * サブクラスでオーバーライドして、接続状態に応じた処理（UIの更新、初期化シーケンスの実行など）
   * を実装することを想定しています。
   *
   * @param available MIDIデバイスが利用可能になった場合は true、そうでなければ false。
   */
  protected onMidiAvailabilityChanged(available: boolean): void {
    this.midiAvailable = available;
    if (available) {
      console.log("✅ MIDI接続完了: デバイスが利用可能です");
    } else {
      console.warn("⚠️ MIDI接続失敗: デバイスが見つかりませんでした");
    }
  }

  /**
   * MIDIが利用可能かどうかを返します。
   */
  public isMidiAvailable(): boolean {
    return this.midiAvailable;
  }
}
