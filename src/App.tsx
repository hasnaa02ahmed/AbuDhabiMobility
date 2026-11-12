import { ChangeEvent, DragEvent, FormEvent, useRef, useState } from "react";

const assets = "/assets";

const steps = [
  ["Licence Number", "Verify entity with DED"],
  ["Company Details", "Company Information"],
  ["Verification", "Confirm Email OTP"],
  ["Documents", "Authorized personnel & docs"],
];

const companyFields = [
  {
    label: "Company name (EN)",
    value: "Al Masaood Traffic Systems & Contracting",
    badge: "From DED",
  },
  {
    label: "Licence expiry date",
    value: "13/01/2027",
    badge: "From DED",
    note: "Must be a future date",
    icon: "ae784.svg",
  },
  {
    label: "Company name (AR)",
    value: "شركة المسعود لأنظمة المرور والمقاولات",
    badge: "EDITED",
    arabic: true,
    icon: "da7d6.svg",
  },
  {
    label: "Licence type",
    value: "Commercial Licence",
    badge: "From DED",
    icon: "3fa4d.svg",
    select: true,
    selectIcon: "37db4.svg",
  },
  { label: "Licence issue date", value: "14/01/2018", badge: "From DED", icon: "0d8c0.svg" },
  { label: "Company licence number", value: "CN-1234567", badge: "From DED", icon: "7d35f.svg" },
  { label: "Registering as", value: "Applicant for Road and Works Permit", icon: "a4206.svg" },
  { label: "Emirate", value: "Abu Dhabi (Mainland)", select: true, selectIcon: "aeb65.svg" },
  {
    label: "Company email",
    value: "permits@almasaood-traffic.ae",
    badge: "From DED",
    verified: true,
  },
  {
    label: "Address",
    value:
      "Office 402, Al Salam Tower, Corniche Road, Sector E-12, Abu Dhabi, United Arab Emirates",
    badge: "From DED",
    multiline: true,
  },
  { label: "Contact person name", value: "Eng. Tariq Al Marzouqi", badge: "From DED" },
  { label: "P.O. Box", value: "48110", optional: true },
  { label: "Contact person role", value: "Technical Director & Signatory" },
];

const activities = [
  ["Building Construction", "Primary"],
  ["Civil Engineering Works", "Primary"],
  ["MEP Installation", "Secondary"],
  ["Interior Fit-out", "Secondary"],
  ["Project Management", "Secondary"],
];

const uploadedFiles = [
  ["Trade Licence.pdf", "4.2 MB / 6.4 MB"],
  ["Signature authorization.pdf", "2.4 MB  •  01/01/2026 10:24 AM"],
  ["Owner's ID.pdf", "1.8 MB  •  01/01/2026 10:26 AM"],
  ["Traffic code.pdf", "1.2 MB  •  01/01/2026 10:28 AM"],
];

function Header({ onLogin }: { onLogin: () => void }) {
  const [languageOpen, setLanguageOpen] = useState(false);

  return (
    <header className="top-nav">
      <a className="brand" href="#" aria-label="Abu Dhabi Mobility home">
        <img src={`${assets}/ae792.png`} alt="Abu Dhabi Mobility" />
      </a>
      <div className="header-controls">
        <div className="language-wrap">
          <button
            className="language-button"
            type="button"
            aria-expanded={languageOpen}
            onClick={() => setLanguageOpen((open) => !open)}
          >
            <img className="globe" src={`${assets}/d58f5.svg`} alt="" />
            <span>English</span>
            <img className="chevron" src={`${assets}/41640.svg`} alt="" />
          </button>
          {languageOpen && (
            <div className="language-menu" role="menu">
              <button type="button" role="menuitem" onClick={() => setLanguageOpen(false)}>
                English
              </button>
              <button type="button" role="menuitem" onClick={() => setLanguageOpen(false)}>
                العربية
              </button>
            </div>
          )}
        </div>
        <button className="login-button" type="button" onClick={onLogin}>
          Login
        </button>
      </div>
    </header>
  );
}

function Progress({
  current,
  onNavigate,
}: {
  current: number;
  onNavigate: (step: number) => void;
}) {
  return (
    <aside className="progress-panel">
      <div>
        <div className="portal-intro">
          <span className="eyebrow">NEW CONTRACTOR</span>
          <h2>Registration Portal</h2>
          <p>Complete all steps to request work permits.</p>
        </div>
        <ol className="steps">
          {steps.map(([title, description], index) => {
            const number = index + 1;
            const complete = number < current;
            return (
              <li
                className={`step${number === current ? " active" : ""}${complete ? " complete" : ""}`}
                key={title}
              >
                <button
                  className="step-number"
                  type="button"
                  disabled={number > current}
                  onClick={() => onNavigate(number)}
                  aria-label={`Go to ${title}`}
                >
                  {complete ? <img src={`${assets}/57171.svg`} alt="Complete" /> : number}
                </button>
                <span className="step-copy">
                  <strong>{title}</strong>
                  <small>{description}</small>
                </span>
              </li>
            );
          })}
        </ol>
      </div>
      <div className="registry-note">
        <img src={`${assets}/${current === 1 ? "65b6d.svg" : "599b1.svg"}`} alt="" />
        <span>Connected to Abu Dhabi DED Registry</span>
      </div>
    </aside>
  );
}

function Navigation({
  onBack,
  onContinue,
  continueLabel = "Continue",
}: {
  onBack: () => void;
  onContinue: () => void;
  continueLabel?: string;
}) {
  return (
    <div className="navigation-row">
      <button className="back-button" type="button" onClick={onBack}>
        Back
      </button>
      <button className="continue-button" type="button" onClick={onContinue}>
        {continueLabel}
        <img src={`${assets}/6af57.svg`} alt="" />
      </button>
    </div>
  );
}

function LicenceScreen({
  licence,
  setLicence,
  verified,
  onVerify,
  onBack,
  onContinue,
}: {
  licence: string;
  setLicence: (value: string) => void;
  verified: boolean;
  onVerify: () => void;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="screen-body licence-screen">
      <div className="section-heading">
        <h1>Company Licence</h1>
        <p>Enter your company's licence number to verify your details with DED.</p>
      </div>
      <div className="licence-form">
        <label htmlFor="licence">LICENCE NUMBER</label>
        <div className="licence-input">
          <input
            id="licence"
            value={licence}
            onChange={(event) => setLicence(event.target.value.toUpperCase())}
            spellCheck={false}
          />
          <span>Abu Dhabi DED</span>
        </div>
        <button className="check-button" type="button" onClick={onVerify}>
          Check Licence
        </button>
      </div>

      {verified && (
        <div className="verified-card">
          <div className="verified-title">
            <span className="success-icon">
              <img src={`${assets}/6c7ad.svg`} alt="" />
            </span>
            <span>
              <strong>Licence verified with DED</strong>
              <small>Company details have been retrieved from DED.</small>
            </span>
          </div>
          <div className="licence-details">
            <div>
              <small>Company Name</small>
              <strong>Skyline Construction LLC</strong>
            </div>
            <div>
              <small>Licence Type</small>
              <strong>Main Contractor</strong>
            </div>
            <div>
              <small>Licence Status</small>
              <span className="active-pill">
                <i /> Active
              </span>
            </div>
            <div>
              <small>Licence Expiry</small>
              <b>31/12/2026</b>
            </div>
            <footer>
              <span>
                Email on file: <u>info@skyline.ae</u>
              </span>
              <em>Emirate: Abu Dhabi (Valid)</em>
            </footer>
          </div>
          <div className="activities-card">
            <header>
              <span>
                <strong>Company Activities</strong>
                <small>Example activities (not actual retrieved licence data)</small>
              </span>
              <em>5 Activities</em>
            </header>
            <div className="activity-grid">
              {activities.map(([name, type]) => (
                <div key={name}>
                  <span>{name}</span>
                  <em>{type}</em>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {verified && <Navigation onBack={onBack} onContinue={onContinue} />}
    </div>
  );
}

function CompanyScreen({ onBack, onContinue }: { onBack: () => void; onContinue: () => void }) {
  const [values, setValues] = useState(companyFields.map((field) => field.value));

  return (
    <div className="screen-body company-screen">
      <div className="section-heading">
        <h1>Company Details</h1>
        <p>
          Enter your company information as retrieved from DED. You can edit the fields if needed.
        </p>
      </div>
      <section className="company-card">
        <header>
          <span>
            <i>
              <img src={`${assets}/77e98.svg`} alt="" />
            </i>
            <strong>Company Information</strong>
          </span>
          <em>Auto-fetched from CN-1094821</em>
        </header>
        <div className="company-grid">
          {companyFields.map((field, index) => (
            <label className={field.multiline ? "multiline" : ""} key={field.label}>
              <span className="field-label">
                <span>
                  {field.label}{" "}
                  {field.optional ? (
                    <small>(Optional)</small>
                  ) : (
                    field.label !== "Contact person role" && <b>*</b>
                  )}
                </span>
                {field.badge && (
                  <em className={field.badge === "EDITED" ? "edited" : ""}>{field.badge}</em>
                )}
              </span>
              <span className="field-control">
                {field.icon && <img src={`${assets}/${field.icon}`} alt="" />}
                {field.multiline ? (
                  <textarea
                    value={values[index]}
                    onChange={(event) =>
                      setValues((current) =>
                        current.map((value, item) => (item === index ? event.target.value : value)),
                      )
                    }
                  />
                ) : (
                  <input
                    dir={field.arabic ? "rtl" : undefined}
                    value={values[index]}
                    onChange={(event) =>
                      setValues((current) =>
                        current.map((value, item) => (item === index ? event.target.value : value)),
                      )
                    }
                  />
                )}
                {field.select && (
                  <img className="select-arrow" src={`${assets}/${field.selectIcon}`} alt="" />
                )}
                {field.verified && <em className="verified-pill">Verified</em>}
              </span>
              {field.note && <small className="field-note">{field.note}</small>}
            </label>
          ))}
        </div>
      </section>
      <Navigation onBack={onBack} onContinue={onContinue} />
    </div>
  );
}

function VerificationScreen({
  onBack,
  onContinue,
}: {
  onBack: () => void;
  onContinue: () => void;
}) {
  const [otp, setOtp] = useState(["2", "2", "2", "", "", ""]);
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  function updateOtp(value: string, index: number) {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => current.map((item, itemIndex) => (itemIndex === index ? digit : item)));
    if (digit && index < 5) refs.current[index + 1]?.focus();
  }

  return (
    <div className="screen-body verification-screen">
      <div className="section-heading">
        <h1>Verification</h1>
        <p>
          We sent a verification code to <strong>co*****@company.com</strong>
        </p>
      </div>
      <div className="otp-block">
        <div className="otp-inputs">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(element) => {
                refs.current[index] = element;
              }}
              inputMode="numeric"
              aria-label={`Verification digit ${index + 1}`}
              value={digit}
              onChange={(event) => updateOtp(event.target.value, index)}
            />
          ))}
        </div>
        <div className="otp-meta">
          <span>
            <img src={`${assets}/e6b2f.svg`} alt="" /> Resend code in <strong>00:44</strong>
          </span>
          <span>
            Attempts remaining: <strong>4</strong>
          </span>
        </div>
      </div>
      <div className="mobile-verification">
        <strong>Mobile Verification</strong>
        <p>Dual authorization required for UAE ICP verification target +971 50 849 2210</p>
      </div>
      <Navigation onBack={onBack} onContinue={onContinue} />
    </div>
  );
}

function DocumentsScreen({ onBack, onComplete }: { onBack: () => void; onComplete: () => void }) {
  const [uploaded, setUploaded] = useState(false);
  const fileInput = useRef<HTMLInputElement>(null);

  function receiveFiles(files: FileList | null) {
    if (files?.length) setUploaded(true);
  }

  function dropFiles(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    receiveFiles(event.dataTransfer.files);
  }

  return (
    <div className={`screen-body documents-screen${uploaded ? " has-files" : ""}`}>
      <div className="section-heading">
        <h1>Documents</h1>
        <p>Upload the required documents. You can upload multiple files (PDF, JPG, PNG).</p>
      </div>
      <input
        className="visually-hidden"
        ref={fileInput}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(event: ChangeEvent<HTMLInputElement>) => receiveFiles(event.target.files)}
      />
      <button
        className="dropzone"
        type="button"
        onClick={() => fileInput.current?.click()}
        onDragOver={(event) => event.preventDefault()}
        onDrop={dropFiles}
      >
        <span className="upload-icon">
          <img src={`${assets}/a2caf.svg`} alt="" />
        </span>
        <strong>Drag and drop files here</strong>
        <b>or click to browse</b>
        <small>Supported formats: PDF, JPG, PNG &nbsp;|&nbsp; Max file size: 10 MB</small>
      </button>

      {uploaded ? (
        <div className="file-area">
          {uploadedFiles.map(([name, detail], index) => (
            <div className={`file-item${index === 0 ? " uploading" : ""}`} key={name}>
              <span className="file-icon">
                <img src={`${assets}/${index === 0 ? "be8a2.svg" : "1fa73.svg"}`} alt="" />
              </span>
              <span className="file-copy">
                <strong>{name}</strong>
                {index > 0 && <small>{detail}</small>}
              </span>
              {index === 0 ? (
                <span className="upload-status">
                  Uploading... 65%
                  <img src={`${assets}/8023e.svg`} alt="Cancel upload" />
                </span>
              ) : (
                <span className="file-actions">
                  <img src={`${assets}/b0b89.svg`} alt="Preview" />
                  <img src={`${assets}/4d09b.svg`} alt="Delete" />
                </span>
              )}
              {index === 0 && (
                <span className="progress-line">
                  <i />
                  <small>{detail}</small>
                </span>
              )}
            </div>
          ))}
          <DocumentChecklist uploaded />
        </div>
      ) : (
        <DocumentChecklist uploaded={false} />
      )}
      <Navigation
        onBack={onBack}
        onContinue={() => {
          if (uploaded) onComplete();
          else setUploaded(true);
        }}
      />
    </div>
  );
}

function DocumentChecklist({ uploaded }: { uploaded: boolean }) {
  const names = uploaded
    ? ["Trade Licence", "Signature authorization", "Owner's ID", "Traffic code"]
    : ["Trade Licence", "Company Certificate", "Articles of Association", "Chamber of Commerce"];

  return (
    <section className="checklist">
      <header>
        <span>
          <img src={`${assets}/c29f1.svg`} alt="" /> <strong>Document Checklist</strong>
        </span>
        {!uploaded && <em>0 / 4 Uploaded</em>}
      </header>
      <div className="checklist-grid">
        {names.map((name) => (
          <div key={name}>
            <span>
              {uploaded ? (
                <img src={`${assets}/6e83b.svg`} alt="" />
              ) : (
                <i>
                  <b />
                </i>
              )}
              {name}
            </span>
            {uploaded ? (
              <em>
                <img src={`${assets}/3df8d.svg`} alt="" /> Uploaded
              </em>
            ) : (
              <em>Required</em>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function ConfirmationScreen({ onExit }: { onExit: () => void }) {
  const [copied, setCopied] = useState(false);

  async function copyReference() {
    try {
      await navigator.clipboard.writeText("REG-2026-0188");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <section className="confirmation-dialog" aria-labelledby="confirmation-title">
      <div className="confirmation-badge">
        <span>
          <img src={`${assets}/1467d.svg`} alt="" />
        </span>
      </div>
      <h1 id="confirmation-title">Registration request sent</h1>
      <p className="confirmation-intro">
        Thank you. TMC will review your company details and documents. You
        <br />
        will receive your login credentials by email once your account is
        <br />
        approved.
      </p>

      <div className="confirmation-details">
        <div>
          <span>Registration reference</span>
          <strong className="reference-code">REG-2026-0188</strong>
          <button type="button" onClick={copyReference} aria-label="Copy registration reference">
            <img src={`${assets}/d8d60.svg`} alt="" />
          </button>
          <i aria-live="polite">{copied ? "Copied" : ""}</i>
        </div>
        <div>
          <span>Company</span>
          <strong>Al Masaood Traffic Systems &amp; Contracting</strong>
        </div>
        <div>
          <span>Licence number</span>
          <strong className="mono">CN-1234567</strong>
        </div>
        <div>
          <span>Credentials will be sent to</span>
          <strong className="mono email">permits@almasaood-traffic.ae</strong>
        </div>
        <div>
          <span>Submitted on</span>
          <strong>15/09/2026, 10:24 AM GST</strong>
        </div>
      </div>

      <div className="confirmation-callout">
        <img src={`${assets}/28c96.svg`} alt="" />
        <p>
          Check that the email above is correct. It is the only place we send your
          <br />
          credentials.
        </p>
      </div>

      <div className="lifecycle-card">
        <h2>APPLICATION LIFECYCLE</h2>
        <div className="lifecycle-steps">
          <i className="lifecycle-line" />
          <div>
            <img className="submitted-icon" src={`${assets}/93369.svg`} alt="" />
            <strong>Submitted</strong>
            <small>Done</small>
          </div>
          <div>
            <span className="current-dot">
              <i />
            </span>
            <strong>TMC review</strong>
            <small>Current</small>
          </div>
          <div className="upcoming">
            <span className="upcoming-dot">3</span>
            <strong>Credentials emailed</strong>
            <small>Upcoming</small>
          </div>
        </div>
      </div>

      <div className="confirmation-actions">
        <button className="confirmation-close" type="button" onClick={onExit}>
          Close
        </button>
        <button className="back-login" type="button" onClick={onExit}>
          Back to login
          <span className="login-icon">
            <img src={`${assets}/a979c.svg`} alt="" />
            <img src={`${assets}/fad2f.svg`} alt="" />
            <img src={`${assets}/e780c.svg`} alt="" />
          </span>
        </button>
      </div>
    </section>
  );
}

function AuthHero() {
  return (
    <section className="auth-hero" aria-label="Abu Dhabi Mobility">
      <div className="auth-photo auth-photo-back">
        <img src={`${assets}/55437.png`} alt="" />
      </div>
      <div className="auth-photo auth-photo-front">
        <img src={`${assets}/6c27a.png`} alt="Abu Dhabi skyline" />
      </div>
      <i className="auth-ring auth-ring-top" />
      <i className="auth-ring auth-ring-bottom" />
      <img className="auth-logo" src={`${assets}/8beb9.png`} alt="Abu Dhabi Mobility" />
      <div className="auth-tagline">
        <strong>The Smart Way to Navigate Permits.</strong>
        <p>
          Harnessing AI to streamline road occupancy and
          <br />
          infrastructure permits across the Emirates.
        </p>
      </div>
    </section>
  );
}

function PasswordField({
  label,
  value,
  onChange,
  eyeAsset,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  eyeAsset: string;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <label className="auth-field">
      <span>
        {label}
        <b>*</b>
      </span>
      <span className="auth-input-wrap">
        <input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Min. 8 characters"
        />
        <button
          type="button"
          onClick={() => setVisible((shown) => !shown)}
          aria-label={`${visible ? "Hide" : "Show"} ${label.toLowerCase()}`}
        >
          <img src={`${assets}/${eyeAsset}`} alt="" />
        </button>
      </span>
    </label>
  );
}

function LoginScreen({
  onCreateAccount,
  onForgotPassword,
}: {
  onCreateAccount: () => void;
  onForgotPassword: () => void;
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [message, setMessage] = useState("");

  function signIn(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(email && password ? "Sign in submitted" : "Enter your email and password");
  }

  return (
    <div className="auth-page">
      <AuthHero />
      <main className="auth-panel">
        <form className="login-form" onSubmit={signIn}>
          <header className="auth-heading login-heading">
            <h1>Login In</h1>
            <p>Enter your email and password to sign in!</p>
          </header>
          <label className="auth-field">
            <span>
              Email<b>*</b>
            </span>
            <span className="auth-input-wrap">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="mail@simmmple.com"
              />
            </span>
          </label>
          <PasswordField
            label="Password"
            value={password}
            onChange={setPassword}
            eyeAsset="68aa4.svg"
          />
          <div className="auth-options">
            <label className="remember-option">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <span>{remember && <img src={`${assets}/63684.svg`} alt="" />}</span>
              Keep me logged in
            </label>
            <button type="button" onClick={onForgotPassword}>
              Forget password?
            </button>
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
          <p className="auth-message" aria-live="polite">
            {message}
          </p>
          <p className="create-account">
            Not registered yet?{" "}
            <button type="button" onClick={onCreateAccount}>
              Create an Account
            </button>
          </p>
        </form>
      </main>
    </div>
  );
}

function ResetPasswordScreen({ onSignIn }: { onSignIn: () => void }) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const started = password.length > 0;
  const rules = [
    ["At least 8 characters", started ? password.length >= 8 : true],
    ["One Uppercase letter", started ? /[A-Z]/.test(password) : false],
    ["One  lowercase letters", started ? /[a-z]/.test(password) : true],
    ["One number", started ? /\d/.test(password) : true],
    ["One special symbols", started ? /[^A-Za-z0-9]/.test(password) : false],
  ] as const;
  const strength = rules.filter(([, valid]) => valid).length;

  function submitReset(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password && password === confirmation && rules.every(([, valid]) => valid)) onSignIn();
  }

  return (
    <div className="auth-page">
      <AuthHero />
      <main className="auth-panel">
        <form className="reset-form" onSubmit={submitReset}>
          <header className="auth-heading reset-heading">
            <h1>Reset Password</h1>
            <p>Your new password must meet the following rules:</p>
          </header>
          <PasswordField
            label="New Password"
            value={password}
            onChange={setPassword}
            eyeAsset="22c1b.svg"
          />
          <PasswordField
            label="Confirm Password"
            value={confirmation}
            onChange={setConfirmation}
            eyeAsset="22c1b.svg"
          />
          <div className="strength-meter">
            <span>Strength</span>
            <div>
              {[1, 2, 3, 4].map((segment) => (
                <i
                  className={segment <= Math.max(1, Math.ceil((strength / 5) * 4)) ? "filled" : ""}
                  key={segment}
                />
              ))}
            </div>
          </div>
          <div className="password-rules">
            {rules.map(([rule, valid]) => (
              <div className={valid ? "valid" : ""} key={rule}>
                <span>
                  <img src={`${assets}/${valid ? "14fe7.svg" : "fcdff.svg"}`} alt="" />
                </span>
                {rule}
              </div>
            ))}
          </div>
          <button className="auth-submit" type="submit">
            Sign In
          </button>
        </form>
      </main>
    </div>
  );
}

export default function App() {
  const [view, setView] = useState<"login" | "reset" | "flow">("login");
  const [current, setCurrent] = useState(1);
  const [licence, setLicence] = useState("CN-1234567");
  const [verified, setVerified] = useState(false);

  const navigate = (step: number) => {
    setCurrent(Math.max(1, Math.min(5, step)));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const next = () => {
    navigate(current + 1);
  };
  const back = () => {
    navigate(current - 1);
  };
  const exitConfirmation = () => {
    setVerified(false);
    navigate(1);
    setView("login");
  };

  if (view === "login") {
    return (
      <LoginScreen
        onCreateAccount={() => {
          setCurrent(1);
          setVerified(false);
          setView("flow");
        }}
        onForgotPassword={() => setView("reset")}
      />
    );
  }

  if (view === "reset") {
    return <ResetPasswordScreen onSignIn={() => setView("login")} />;
  }

  return (
    <div className={`license-page step-${current}${current === 1 && verified ? " verified" : ""}`}>
      <Header onLogin={() => setView("login")} />
      <img className="skyline" src={`${assets}/a8938.png`} alt="" aria-hidden="true" />
      <main className="main-content">
        {current === 5 ? (
          <ConfirmationScreen onExit={exitConfirmation} />
        ) : (
          <section
            className={`portal-card${current === 2 ? " company-layout" : ""}`}
            aria-label="Contractor registration"
          >
            <Progress current={current} onNavigate={navigate} />
            <div className="form-panel">
              {current === 1 && (
                <LicenceScreen
                  licence={licence}
                  setLicence={setLicence}
                  verified={verified}
                  onVerify={() => setVerified(true)}
                  onBack={() => setVerified(false)}
                  onContinue={next}
                />
              )}
              {current === 2 && <CompanyScreen onBack={back} onContinue={next} />}
              {current === 3 && <VerificationScreen onBack={back} onContinue={next} />}
              {current === 4 && <DocumentsScreen onBack={back} onComplete={next} />}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
