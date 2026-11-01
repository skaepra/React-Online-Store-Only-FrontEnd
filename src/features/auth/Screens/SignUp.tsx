import { FormEvent, ChangeEvent } from "react";
import { IoPersonOutline, IoMailOutline, IoAlertCircleOutline } from "react-icons/io5";

import { useSignup } from "../hooks/useSignup";
import BaseInput from "../../../shared/components/BaseInput";
import PasswordInput from "../../../shared/components/PasswordInput";
import { AuthScreenLayout } from "../components/AuthScreenLayout";
import { authStyles } from "../components/authStyles";

export default function SignUpScreen() {
  const { formData, errors, updateField, submit, loading, errorMessage, isError } =
    useSignup();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await submit();
  };

  return (
    <AuthScreenLayout mode="signup">
      <form onSubmit={onSubmit} className={authStyles.form}>
        {isError && errorMessage && (
          <div className={authStyles.errorBanner}>
            <IoAlertCircleOutline size={18} className="shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <BaseInput
          type="text"
          name="FullName"
          value={formData.fullName || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            updateField("fullName", e.target.value)
          }
          placeholder="Name"
          error={errors?.fullName}
          icon={<IoPersonOutline size={18} />}
          variant="soft"
        />

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

        <button
          type="submit"
          disabled={
            loading || !formData.fullName || !formData.Email || !formData.password
          }
          className={authStyles.submitBtn}
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>
    </AuthScreenLayout>
  );
}
