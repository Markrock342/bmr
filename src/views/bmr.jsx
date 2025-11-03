import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bmrIcon from "../assets/imgBMR/bmr.png"; // ตรวจสอบ path ให้ถูกต้อง

const Bmr = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("male"); // ค่าเริ่มต้นเป็น 'male'
  const [bmr, setBmr] = useState(null); // ค่าเริ่มต้นเป็น null
  const navigate = useNavigate();

  // Real-time calculation using useEffect
  useEffect(() => {
    const calculateRealtimeBmr = () => {
      const w = parseFloat(weight);
      const h = parseFloat(height);
      const a = parseFloat(age);

      if (w > 0 && h > 0 && a > 0) {
        let bmrValue;
        if (gender === "male") {
          // Male: BMR = (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) + 5
          bmrValue = (10 * w) + (6.25 * h) - (5 * a) + 5;
        } else {
          // Female: BMR = (10 * weight_kg) + (6.25 * height_cm) - (5 * age_years) - 161
          bmrValue = (10 * w) + (6.25 * h) - (5 * a) - 161;
        }
        setBmr(bmrValue);
      } else {
        setBmr(null); // รีเซ็ตค่า BMR เป็น null เมื่อ input ไม่สมบูรณ์
      }
    };

    calculateRealtimeBmr();
  }, [weight, height, age, gender]); // Dependency array: จะรัน useEffect ใหม่เมื่อค่าใดๆ เปลี่ยน

  // Function สำหรับปุ่ม "คำนวณ BMR" (เน้นการตรวจสอบและแจ้งเตือน)
  const calculateBmr = () => {
    if (!weight || !height || !age || parseFloat(weight) <= 0 || parseFloat(height) <= 0 || parseFloat(age) <= 0) {
      alert("กรุณาป้อนน้ำหนัก ส่วนสูง และอายุให้ครบถ้วนและเป็นค่าที่ถูกต้อง");
    }
    // การคำนวณจริงจะถูกจัดการโดย useEffect อยู่แล้ว
  };

  const resetFields = () => {
    setWeight("");
    setHeight("");
    setAge("");
    setGender("male");
    setBmr(null);
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
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: "100%",
        maxWidth: "450px",
        padding: "40px",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "20px"
      }}>
        <h1 style={{ fontSize: "2rem", fontWeight: "bold", margin: 0, color: "#333" }}>BMR Calculator</h1>
        <p style={{ fontSize: "1.1rem", color: "#666", margin: "0 0 10px 0" }}>คำนวณ BMR</p>
        <img src={bmrIcon} alt="BMR Icon" style={{ width: 100, margin: "0 auto 20px auto" }} />

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

        <div style={{ textAlign: "left" }}>
          <label htmlFor="age" style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>ป้อนอายุ (ปี)</label>
          <input
            type="number"
            id="age"
            placeholder="เช่น 30"
            value={age}
            onChange={(e) => setAge(e.target.value)}
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
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#555" }}>เพศ:</label>
          <div style={{ display: "flex", gap: "20px" }}>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer",color: "black" }}>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              ชาย
            </label>
            <label style={{ display: "flex", alignItems: "center", cursor: "pointer", color: "black"}}>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                style={{ marginRight: "8px" }}
              />
              หญิง
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={calculateBmr}
            style={{
              flex: 1,
              background: "#6f42c1", // สีม่วง
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
            คำนวณ BMR
          </button>

          <button
            onClick={resetFields}
            style={{
              flex: 1,
              background: "#dc3545", // สีแดง
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
          ค่า BMR ที่คำนวณได้: <span style={{ color: "#6f42c1" }}>{bmr !== null ? bmr.toFixed(2) : "0.00"}</span>
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

export default Bmr;