import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bmiIcon from "../assets/imgBMI/bmi.png";

const Bmi = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const navigate = useNavigate();

  // Real-time calculation using useEffect
  useEffect(() => {
    // ตรวจสอบว่ามีค่า weight และ height ที่เป็นตัวเลขและมากกว่า 0
    if (parseFloat(weight) > 0 && parseFloat(height) > 0) {
      const heightInMeters = parseFloat(height) / 100;
      const bmiValue = (parseFloat(weight) / (heightInMeters * heightInMeters));
      setBmi(bmiValue);

      if (bmiValue < 18.5) {
        setStatus("น้ำหนักน้อยกว่าปกติ");
      } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
        setStatus("น้ำหนักปกติ");
      } else if (bmiValue >= 25 && bmiValue <= 29.9) {
        setStatus("น้ำหนักเกิน");
      } else {
        setStatus("โรคอ้วน");
      }
    } else {
      setBmi(null); // รีเซ็ตค่า BMI เป็น null เมื่อ input ไม่สมบูรณ์
      setStatus(""); // รีเซ็ตสถานะ
    }
  }, [weight, height]); // Dependency array: จะรัน useEffect ใหม่เมื่อ weight หรือ height เปลี่ยน

  // Function สำหรับปุ่ม "คำนวณ BMI" (เน้นการตรวจสอบและแจ้งเตือน)
  const calculateBmi = () => {
    if (!weight || !height || parseFloat(weight) <= 0 || parseFloat(height) <= 0) {
      alert("กรุณาป้อนน้ำหนักและส่วนสูงให้ครบถ้วนและเป็นค่าที่ถูกต้อง");
    }
    // การคำนวณจริงจะถูกจัดการโดย useEffect อยู่แล้ว
    // ดังนั้นฟังก์ชันนี้จึงเน้นที่การแจ้งเตือนผู้ใช้หากข้อมูลไม่ถูกต้อง
  };

  const resetFields = () => {
    setWeight("");
    setHeight("");
    setBmi(null);
    setStatus("");
  };

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div style={{
      background: "#f5f6fa",
      minHeight: "100vh",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px"
    }}>
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        boxShadow: "0 4px 12px rgba(207, 195, 195, 0.1)",
        width: "100%",
        maxWidth: "450px",
        padding: "40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#333" }}>BMI Calculator</h1>
        <p style={{ fontSize: "1.1rem", color: "#666", margin: "0 0 10px 0" }}>คำนวณ BMI</p>
        <img src={bmiIcon} alt="BMI Icon" style={{ width: 100, margin: "0 auto 20px auto" }} />

        <div style={{ textAlign: "left" }}>
          <label htmlFor="weight" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ป้อนน้ำหนัก (กิโลกรัม)</label>
          <input
            type="number"
            id="weight"
            placeholder="เช่น 65"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
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
          <label htmlFor="height" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ป้อนส่วนสูง (เซนติเมตร)</label>
          <input
            type="number"
            id="height"
            placeholder="เช่น 170"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            style={{
              width: "calc(100% - 20px)",
              padding: "12px 10px",
              borderRadius: "8px",
              border: "1px solid #ddd",
              fontSize: "1rem"
            }}
          />
        </div>

        {/* ปุ่ม "คำนวณ BMI" ที่กลับมา */}
        <button
          onClick={calculateBmi}
          style={{
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
          คำนวณ BMI
        </button>

        <button
          onClick={resetFields}
          style={{
            background: "#949faaff",
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
          รีเซ็ต
        </button>

        <div style={{
          background: "#f8f9fa",
          padding: "15px",
          borderRadius: "8px",
          border: "1px solid #eee",
          fontSize: "1.2rem",
          fontWeight: "bold",
          color: "#333"
        }}>
          ค่า BMI ที่คำนวณได้: <span style={{ color: "#007bff" }}>{bmi !== null ? bmi.toFixed(2) : "0.00"}</span>
          {status && <p style={{ margin: "8px 0 0 0", fontSize: "1rem", color: "#555" }}>สถานะ: {status}</p>}
        </div>

        <button
          onClick={goToHome}
          style={{
            background: "#eaedf0ff",
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

export default Bmi;