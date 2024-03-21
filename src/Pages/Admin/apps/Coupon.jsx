import { FormEvent, useEffect, useState } from "react";
import AdminLayout from "../../../Components/Admin/AdminLayout";
// import AdminSidebar from "../../../Components/admin/AdminSidebar";

const allLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const allNumbers = "1234567890";
const allSymbols = "!@#$%^&*()_+";

const Coupon = () => {
  const [size, setSize] = useState(8);
  const [prefix, setPrefix] = useState("");
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [includeCharacters, setIncludeCharacters] = useState(false);
  const [includeSymbols, setIncludeSymbols] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const [coupon, setCoupon] = useState("");

  const copyText = async (coupon) => {
    await window.navigator.clipboard.writeText(coupon);
    setIsCopied(true);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!includeNumbers && !includeCharacters && !includeSymbols)
      return alert("Please Select One At Least");

    let result = prefix || "";
    const loopLength = size - result.length;

    for (let i = 0; i < loopLength; i++) {
      let entireString = "";
      if (includeCharacters) entireString += allLetters;
      if (includeNumbers) entireString += allNumbers;
      if (includeSymbols) entireString += allSymbols;

      const randomNum = ~~(Math.random() * entireString.length);
      result += entireString[randomNum];
    }

    setCoupon(result);
  };

  useEffect(() => {
    setIsCopied(false);
  }, [coupon]);

  return (
    <AdminLayout>
      <div className="admin-container w-fix h-calc bg-white/10 flex items-center text-zinc-300 justify-center">
        <main
          className="dashboard-app-container rounded-sm w-2/5 h-3/5 p-10
        "
        >
          <h1 className="text-center py-10 text-4xl">Coupon</h1>
          <section>
            <form className="coupon-form" onSubmit={submitHandler}>
              <input
                type="text"
                className="w-5/6 p-2 bg-transparent outline-none border"
                placeholder="Text to include"
                value={prefix}
                onChange={(e) => setPrefix(e.target.value)}
                maxLength={size}
              />

              <input
                type="number"
                className="w-1/6 bg-transparent outline-none border p-2 border-l-0"
                placeholder="Coupon Length"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                min={8}
                max={25}
              />

              <fieldset>
                <legend>Include</legend>

                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={() => setIncludeNumbers((prev) => !prev)}
                />
                <span>Numbers</span>

                <input
                  type="checkbox"
                  checked={includeCharacters}
                  onChange={() => setIncludeCharacters((prev) => !prev)}
                />
                <span>Characters</span>

                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={() => setIncludeSymbols((prev) => !prev)}
                />
                <span>Symbols</span>
              </fieldset>
              <button type="submit">Generate</button>
            </form>

            {coupon && (
              <div
                onClick={() => copyText(coupon)}
                className="w-full text-center py-5 hover:bg-white/30"
              >
                {coupon} {isCopied ? "Copied" : "Copy"}
              </div>
            )}
          </section>
        </main>
      </div>
    </AdminLayout>
  );
};

export default Coupon;
