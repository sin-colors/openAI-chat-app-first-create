import { CredentialsSignin } from "next-auth";

export class InvalidPasswordError extends CredentialsSignin {
  code: string = "invalid_password";
  message: string = "パスワードが間違ってます";
}

export class UserNotFoundError extends CredentialsSignin {
  code: string = "user_not_found";
  message: string = "ユーザーが見つかりません";
}

export class MissingCredentialsError extends CredentialsSignin {
  code: string = "missing_credentials";
  message: string = "すべて入力してください";
}
