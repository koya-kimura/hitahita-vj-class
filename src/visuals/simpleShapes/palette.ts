import type p5 from "p5";
import {
  applyRoleFill,
  applyRoleStroke,
  type RoleColorKey,
} from "../../utils/color/colorPalette";

export const fillRole = (
  tex: p5.Graphics,
  role: RoleColorKey,
  alpha = 255,
): void => {
  applyRoleFill(tex, role, alpha);
};

export const strokeRole = (
  tex: p5.Graphics,
  role: RoleColorKey,
  alpha = 255,
): void => {
  applyRoleStroke(tex, role, alpha);
};
