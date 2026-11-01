import { FormEvent, ChangeEvent } from "react";
import { IoMailOutline, IoAlertCircleOutline } from "react-icons/io5";

import { useLogin } from "../hooks/useLogin";
import PasswordInput from "../../../shared/components/PasswordInput";
import BaseInput from "../../../shared/components/BaseInput";
import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { authStyles } from "../components/authStyles";

export default function LoginScreen() {
  const { formData, errors, updateField, submit, loading, errorMessage, isError } =
    useLogin();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <AuthScreenLayout mode="login">
      <form onSubmit={onSubmit} className={authStyles.form}>
        {isError && errorMessage && (
          <div className={authStyles.errorBanner}>
            <IoAlertCircleOutline size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <BaseInput
          type="email"
          name="Email"
          value={formData.Email || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateField("Email", e.target.value)
          }
          placeholder="Email"
          error={errors?.Email}
          icon={<IoMailOutline size={18} />}
          variant="soft"
        />

        <PasswordInput
          name="password"
          value={formData.password || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateField("password", e.target.value)
          }
          placeholder="Password"
          error={errors?.password}
          variant="soft"
        />

        <div className={authStyles.checkboxContainer}>
          <input
            type="checkbox"
            id="remember"
            name="Remember"
            checked={!!formData.Remember}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              updateField("Remember", e.target.checked)
            }
            className={authStyles.checkbox}
          />
          <label htmlFor="remember" className={authStyles.checkboxLabel}>
            Remember me
          </label>
        </div>

        <button
          type="submit"
          disabled={loading || !formData.Email || !formData.password}
          className={authStyles.submitBtn}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </AuthScreenLayout>
  );
}
