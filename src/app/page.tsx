"use client"
import Image from "next/image";
import router from "next/router";
import { useState } from "react";

export default function Home() {
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState({
    card_number: "",
    name: "",
    month: "",
    year: "",
    cvc: ""
  })

  const [formData, setFormData] = useState({
    name: "",
    card_number: "",
    month: "",
    year: "",
    cvc: ""
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    let valid = true

    let errors = {
      name: "",
      card_number: "",
      month: "",
      year: "",
      cvc: ""
    };

    if (formData?.name.length === 0) {
      valid = false
      errors.name = "Please input your name"
    }
    if (formData?.card_number.replace(/\s/g, "").length < 16 && !formData?.card_number) {
      valid = false
      errors.card_number = "Card number must be 16 digits"
    }
    if (!/^\d{3}$/.test(formData.cvc)) {
      valid = false
      errors.cvc = "Can't be blank"
    }
    if (!/^(2[5-9]|3[0-5])$/.test(formData.year)) {
      valid = false
      errors.year = "Can't be blank and check the input"
    }
    if (!/^(0[1-9]|1[0-2])$/.test(formData.month)) {
      valid = false
      errors.month = "Can't be blank and check the input"
    }


    setError(errors)

    if (valid) {
      setIsSuccess(true)
    }

  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    let { name, value } = e.target

    // Validation
    if (name === "card_number") {

      if (/\D/.test(value)) {
        setError((prev) => ({ ...prev, card_number: "Wrong format, numbers only" }));
      }
      else {
        setError((prev) => ({ ...prev, card_number: "" }))
      }
      value = value.replace(/\D/g, "")

      if (value.length > 16) {
        value = value.slice(0, 16);
      }

      setFormData((prev) => ({ ...prev, [name]: formatCardNumber(value) }));
    }
    else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }


  }


  return (
    <div className="grid grid-cols-5 h-screen">
      <div className="col-span-1">
        <Image alt="bg" src="/assets/bg-main-desktop.png" width={483} height={0} className="absolute w-[483px] object-cover"></Image>
      </div>
      <div className="absolute top-50 left-50 justify-center place-items-center">
        <Image alt="bg" src="/assets/bg-card-front.png" width={0} height={0} className="w-[400px] h-[245px] shadow-md rounded-xl"></Image>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col text-white text-lg p-5">
          <Image alt="logo" src="/assets/card-logo.svg" width={100} height={40} className="mb-10"></Image>
          <div className="flex">
            <label className="text-2xl">{formData.card_number ? formData.card_number : "0000 0000 0000 0000"}</label>
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              {formData.name}
            </div>
            <div className="w-1/2 justify-items-end">
              {formData.month + "/" + formData.year}
            </div>
          </div>

        </div>
        <div className="relative left-0 mt-10 left-20 z-50">
          <Image alt="bg" src="/assets/bg-card-back.png" width={0} height={0} className="w-[400px] h-[245px] shadow-md rounded-xl"></Image>
          <div className="absolute top-27 right-15 text-white text-lg">
            <p>{formData.cvc}</p>
          </div>
        </div>
      </div>
      <div className="col-span-2">

      </div>

      <div className="flex flex-col justify-center items-center col-span-2 w-4/5">
        {isSuccess ?
          <div>
            <h1 className="text-2xl font-bold">Thank you!</h1>
            <p>We've added your card details.</p>
            <form>
              <button type="submit" className="w-full bg-foreground text-white p-3 rounded-md">Continue</button>
            </form>
          </div>
          :
          <>
            <form onSubmit={handleSubmit} className="space-y-4">
              <label>CARDHOLDER NAME</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Jane Appleseed"
                value={formData.name}
                onChange={handleChange}
                className={`border p-2 w-full rounded-md ${error.name ? "border-red-500" : ""} `}
              />
              {error.name && <p className="text-red-500 text-sm">{error.name}</p>}
              <label>CARD NUMBER</label>
              <input
                type="text"
                name="card_number"
                placeholder="e.g. 1234 5678 9123 0000"
                value={formData.card_number}
                onChange={handleChange}
                inputMode="numeric"
                className={`border p-2 w-full rounded-md ${error.card_number ? "border-red-500" : ""} `}
              />
              {error.card_number && <p className="text-red-500 text-sm">{error.card_number}</p>}

              <div className="grid grid-cols-6 grid-rows-2 gap-8">
                <div className="col-span-3">
                  <label>EXP. DATE(MM/YY)</label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="month"
                      value={formData.month}
                      placeholder="MM"
                      onChange={handleChange}
                      className={`w-1/2 h-10 border rounded-md text-center outline-none ${error.month ? "border-red-500" : ""} `}
                      maxLength={2}
                    />

                    <input
                      type="text"
                      name="year"
                      value={formData.year}
                      placeholder="YY"
                      onChange={handleChange}
                      className={`w-1/2 h-10 border rounded-md text-center outline-none ${error.year ? "border-red-500" : ""} `}
                      maxLength={2}
                    />

                  </div>
                  <div className="flex gap-2">
                    {error.month && <p className="text-red-500 text-sm">{error.month}</p>}
                    {error.year && <p className="text-red-500 text-sm">{error.year}</p>}
                  </div>
                </div>
                <div className="col-span-3">
                  <label>CVC</label>
                  <input
                    type="text"
                    name="cvc"
                    placeholder="e.g. 123"
                    value={formData.cvc}
                    onChange={handleChange}
                    className={`border p-2 rounded-md w-full h-10  ${error.cvc ? "border-red-500" : ""} `}
                  />
                  {error.cvc && <p className="text-red-500 text-sm">{error.cvc}</p>}
                </div>
              </div>
              <button type="submit" className="w-full bg-foreground text-white p-3 rounded-md">
                Confirm
              </button>

            </form>


            <div className="attribution">
              Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>.
              Coded by <a href="#">Shan</a>.
            </div>
          </>
        }
      </div>
    </div>
  );
}
