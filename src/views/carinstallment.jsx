import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import carIcon from '../assets/imgCar/car.png';

const CarInstallment = () => {
  const [calculatorName, setCalculatorName] = useState('');
  const [carPrice, setCarPrice] = useState('');
  const [downPaymentInput, setDownPaymentInput] = useState('');
  const [annualInterestRate, setAnnualInterestRate] = useState('');
  const [downPaymentPercentage, setDownPaymentPercentage] = useState('15');
  const [installmentMonths, setInstallmentMonths] = useState('24');
  const [monthlyInstallment, setMonthlyInstallment] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const calculateRealtimeInstallment = () => {
      const price = parseFloat(carPrice);
      const interestRate = parseFloat(annualInterestRate);
      const months = parseInt(installmentMonths);

      if (isNaN(price) || price <= 0 || isNaN(interestRate) || interestRate < 0 || isNaN(months) || months <= 0) {
        setMonthlyInstallment(null);
        return;
      }

      let actualDownPaymentAmount = parseFloat(downPaymentInput);


      if (isNaN(actualDownPaymentAmount) || actualDownPaymentAmount <= 0) {
        const dpPercentage = parseFloat(downPaymentPercentage) / 100;
        actualDownPaymentAmount = price * dpPercentage;
      }

      if (actualDownPaymentAmount >= price) {
        setMonthlyInstallment(0); 
        return;
      }

      const loanAmount = price - actualDownPaymentAmount;
      const installmentYears = months / 12;
      const totalInterest = loanAmount * (interestRate / 100) * installmentYears;
      const totalPayment = loanAmount + totalInterest;
      const monthly = totalPayment / months;

      setMonthlyInstallment(monthly);
    };

    calculateRealtimeInstallment();
  }, [carPrice, downPaymentInput, annualInterestRate, downPaymentPercentage, installmentMonths]);

  const handleCalculate = () => {
    const price = parseFloat(carPrice);
    const interestRate = parseFloat(annualInterestRate);
    const months = parseInt(installmentMonths);

    if (!carPrice || !annualInterestRate || !installmentMonths || isNaN(price) || price <= 0 || isNaN(interestRate) || interestRate < 0 || isNaN(months) || months <= 0) {
      alert("กรุณาป้อนข้อมูล ราคารถ, ดอกเบี้ยต่อปี และจำนวนเดือนที่ผ่อนให้ครบถ้วนและเป็นค่าที่ถูกต้อง");
      setMonthlyInstallment(null);
      return;
    }

    let actualDownPaymentAmount = parseFloat(downPaymentInput);
    if (isNaN(actualDownPaymentAmount) || actualDownPaymentAmount <= 0) {
      const dpPercentage = parseFloat(downPaymentPercentage) / 100;
      actualDownPaymentAmount = price * dpPercentage;
    }

    if (actualDownPaymentAmount >= price) {
        alert("เงินดาวน์ต้องน้อยกว่าราคารถ");
        setMonthlyInstallment(null);
        return;
    }
  };

  const resetFields = () => {
    setCalculatorName('');
    setCarPrice('');
    setDownPaymentInput('');
    setAnnualInterestRate('');
    setDownPaymentPercentage('15');
    setInstallmentMonths('24');
    setMonthlyInstallment(null);
  };

  const goToHome = () => {
    navigate('/');
  };

  return (
    <div style={{
      background: "#f5f6fa",
      minHeight: "100vh",
      width: "100vw",
      boxSizing: "border-box",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      overflow: "hidden", 

    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        width: "100%",
        alignSelf: "center",
        padding: "40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        margin: "1px 10px", // ยังคง margin เพื่อเว้นขอบบนล่าง
        transform: "scale(0.75)", // ย้าย transform มาที่ div นี้
        transformOrigin: "center center", // กำหนดจุดย่อให้อยู่ตรงกลาง
        boxSizing: "border-box", // ให้ padding รวมอยู่ใน width/height
        maxHeight: "calc(100vh / 0.75 - 80px)", // คำนวณ maxHeight สำหรับขนาด *ก่อน* ย่อ (100vh / scale - margin บนล่าง)
        overflowY: "auto" // ให้มี scrollbar ภายในกล่องนี้ถ้าเนื้อหาเกิน
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#333" }}>Car Installment Calculator</h1>
        <p style={{ fontSize: "1.1rem", color: "#666", margin: "0 0 10px 0" }}>คำนวณ Car Installment</p>
        <img src={carIcon} alt="Car Icon" style={{ width: 100, margin: "0 auto 20px auto" }} />

        <div style={{ textAlign: "left" }}>
          <label htmlFor="calculatorName" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ชื่อผู้คำนวณ</label>
          <input
            type="text"
            id="calculatorName"
            placeholder="ชื่อของคุณ"
            value={calculatorName}
            onChange={(e) => setCalculatorName(e.target.value)}
            style={{
              width: "calc(100% - 20px)",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
        </div>

        <div style={{ textAlign: "left" }}>
          <label htmlFor="carPrice" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ราคารถ (บาท)</label>
          <input
            type="number"
            id="carPrice"
            placeholder="เช่น 500000"
            value={carPrice}
            onChange={(e) => setCarPrice(e.target.value)}
            style={{
              width: "calc(100% - 20px)",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
        </div>

        <div style={{ textAlign: "left" }}>
          <label htmlFor="downPaymentInput" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>เงินดาวน์ (บาท)</label>
          <input
            type="number"
            id="downPaymentInput"
            placeholder="เช่น 100000"
            value={downPaymentInput}
            onChange={(e) => {
                setDownPaymentInput(e.target.value);
                setDownPaymentPercentage('');
            }}
            style={{
              width: "calc(100% - 20px)",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
        </div>

        <div style={{ textAlign: "left" }}>
          <label htmlFor="annualInterestRate" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ดอกเบี้ยต่อปี (%)</label>
          <input
            type="number"
            id="annualInterestRate"
            placeholder="เช่น 2.5"
            value={annualInterestRate}
            onChange={(e) => setAnnualInterestRate(e.target.value)}
            style={{
              width: "calc(100% - 20px)",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
        </div>

        <div style={{ textAlign: "left" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>เงินดาวน์ (%)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "15px",color: "black" }}>
            {['15', '20', '25', '30', '35'].map(percentage => (
              <label key={percentage} style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
                <input
                  type="radio"
                  name="downPaymentPercentage"
                  value={percentage}
                  checked={downPaymentPercentage === percentage}
                  onChange={(e) => {
                    setDownPaymentPercentage(e.target.value);
                    setDownPaymentInput('');
                  }}
                  style={{ marginRight: "5px" }}
                />
                {percentage}%
              </label>
            ))}
          </div>
        </div>

        <div style={{ textAlign: "left" }}>
          <label htmlFor="installmentMonths" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>จำนวนเดือนที่ผ่อน</label>
          <select
            id="installmentMonths"
            value={installmentMonths}
            onChange={(e) => setInstallmentMonths(e.target.value)}
            style={{
              width: "100%",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem",
              backgroundColor: "#fff",
              cursor: "pointer",
              color: "black"
            }}
          >
            <option value="24">24 เดือน</option>
            <option value="36">36 เดือน</option>
            <option value="48">48 เดือน</option>
            <option value="60">60 เดือน</option>
            <option value="72">72 เดือน</option>
            <option value="84">84 เดือน</option>
          </select>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={handleCalculate}
            style={{
              flex: 1,
              background: "#007bff",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            คำนวณ
          </button>

          <button
            onClick={resetFields}
            style={{
              flex: 1,
              background: "#6c757d",
              color: "#fff",
              padding: "12px 20px",
              borderRadius: "8px",
              border: "none",
              fontSize: "1.1rem",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            ล้างข้อมูล
          </button>
        </div>

        <div style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #eee",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#333"
        }}>
          ผ่อนชำระต่อเดือน: <span style={{ color: "#007bff" }}>{monthlyInstallment !== null ? monthlyInstallment.toFixed(2) : "0.00"}</span> บาท
        </div>

        <button
          onClick={goToHome}
          style={{
            background: "#e9ecef",
            color: "#333",
            padding: "12px 20px",
            borderRadius: "8px",
            border: "none",
            fontSize: "1.1rem",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s",
          }}
        >
          กลับหน้าหลัก
        </button>
      </div>
    </div>
  );
};

export default CarInstallment;