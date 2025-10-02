// import { useState, useRef } from "react";

// export const OTPInput = () => {
//   const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
//   const [isComplete, setIsComplete] = useState(false);
//   const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

//   const handleChange = (value: string, index: number) => {
//     if (!/^[0-9]?$/.test(value)) return; // chỉ cho nhập số

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 5) {
//       inputRefs.current[index + 1]?.focus(); // auto move
//     }

//     setIsComplete(newOtp.every((digit) => digit !== ""));
//   };

//   const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
//     if (e.key === "Backspace" && !otp[index] && index > 0) {
//       inputRefs.current[index - 1]?.focus();
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const code = otp.join("");
//     alert(`OTP nhập vào: ${code}`);
//     // TODO: gọi API confirm OTP
//   };

//   return (
//     <div className="otp-container">
//       <div className="icon-container">
//         <span className="material-icons">security</span>
//       </div>

//       <h1 className="title">Xác thực OTP</h1>
//       <p className="subtitle">
//         Chúng tôi đã gửi mã xác thực 6 số đến
//         <br />
//         <span className="phone-number">+84 *** *** 789</span>
//       </p>

//       <div className="success-message" id="successMessage" style={{ display: "none" }}>
//         <span className="material-icons">check_circle</span>
//         Xác thực thành công!
//       </div>

//       <div className="error-message" id="errorMessage" style={{ display: "none" }}>
//         <span className="material-icons">error</span>
//         Mã OTP không chính xác. Vui lòng thử lại.
//       </div>

//       <form id="otpForm" onSubmit={handleSubmit}>
//         <div className="otp-inputs">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               className="otp-input"
//               maxLength={1}
//               value={digit}
//               ref={(el) => (inputRefs.current[index] = el)}
//               onChange={(e) => handleChange(e.target.value, index)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//             />
//           ))}
//         </div>

//         <button
//           type="submit"
//           className="verify-button"
//           id="verifyButton"
//           disabled={!isComplete}
//         >
//           <span className="material-icons">verified_user</span>
//           Xác thực
//         </button>
//       </form>

//       {/* Resend section (bạn có thể bật lại nếu muốn) */}
//       {/* 
//       <div className="resend-section">
//         Không nhận được mã?
//         <button type="button" className="resend-button" id="resendButton">
//           Gửi lại
//         </button>
//         <div id="timerSection" style={{ marginTop: "8px" }}>
//           Gửi lại sau <span className="timer" id="timer">60</span>s
//         </div>
//       </div>
//       */}
//     </div>
//   );
// };

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
        className="verify-button bg-blue-600 text-white px-4 py-2 rounded mt-3"
      >
        Xác nhận
      </button>
    </div>
  );
};

