import * as service from "../services/auth.service.js";

export const login = async (req, res, next) => {
  try {
    const token = await service.login(req.body);
    res.json({ token });
  } catch (err) {
    next(err);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    await service.forgotPassword(req.body.email);

    res.json({ message: "Reset link was sent" });
  } catch (err) {
    next(err);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    await service.resetPassword(req.body);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    next(err);
  }
};