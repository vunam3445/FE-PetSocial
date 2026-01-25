
export const OTPInput = ({
  email,
  value,
  onChange,
  onSubmit,
}: {
  email: string;
  value: string;
  onChange: (val: string) => void;
  onSubmit: () => void;
}) => {
  return (
    <div className="otp-container">
      <h1 className="title">Xác thực OTP</h1>
      <p className="subtitle">
        Chúng tôi đã gửi mã xác thực đến <span>{email}</span>
      </p>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="otp-input"
        placeholder="Nhập OTP"
      />

      <button
        onClick={onSubmit}
        className="px-4 py-2 mt-3 text-white bg-blue-600 rounded verify-button"
      >
        Xác nhận
      </button>
    </div>
  );
};

