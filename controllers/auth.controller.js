import * as service from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const token = await service.login(req.body);
    res.json({ success: true, data: { token }, message: "Login successful" });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await service.forgotPassword(req.body.email);

    res.json({ success: true, message: "Reset link was sent" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await service.resetPassword(req.body);

    res.json({ success: true, message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};