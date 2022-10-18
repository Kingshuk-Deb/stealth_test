import { Response } from 'express';

export default function createAPIError(status, message, res?: Response) {
  return res.status(status).json({
    success: false,
    error: message
  });
}
