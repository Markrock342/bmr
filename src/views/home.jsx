import React from "react";
import { Link } from "react-router-dom";
import bmiImg from "../assets/home/bmi.png";
import bmrImg from "../assets/home/bmr.png";
import carInstallmentImg from "../assets/home/carinstallment.png";
import calculatorImg from "../assets/home/calculator.png"; // เพิ่มการ import รูปใหม่

export default function Home() {
  return (
    <div style={{
      background: "#f5f6fa",
      minHeight: "100vh",
      width: "100%",
      position: "absolute",
      top: 0,
      left: 0,
      height: "100vh"
    }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 0", marginTop: "100px" }}>
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <img src={calculatorImg} alt="Calculator Icon" style={{ width: 80, marginBottom: 16 }} />
          <h1 style={{ fontWeight: "bold", fontSize: "2.5rem", margin: 0, color: "#000000ff" }}>เครื่องมือคำนวณออนไลน์</h1>
          <p style={{ color: "#555", fontSize: "1.1rem" }}>เลือกการคำนวณที่คุณต้องการจากรายการด้านล่าง</p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "40px",
            width: "100%",
          }}
        >
          <Link to="/bmi" style={{ textDecoration: "none" }}>
            <div style={{
              background: "none",
              boxShadow: "none",
              borderRadius: "0",
              width: "auto",
              padding: "0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <img src={bmiImg} alt="BMI" style={{ width: 350 }} />
            </div>
          </Link>
          {/* สลับ BMR กับ Car Installment */}
          <Link to="/bmr" style={{ textDecoration: "none" }}> {/* เปลี่ยนจาก /carinstallment เป็น /bmr */}
            <div style={{
              background: "none",
              boxShadow: "none",
              borderRadius: "0",
              width: "auto",
              padding: "0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <img src={carInstallmentImg} alt="Car Installment" style={{ width: 350 }} />
            </div>
          </Link>
          <Link to="/carinstallment" style={{ textDecoration: "none" }}> {/* เปลี่ยนจาก /bmr เป็น /carinstallment */}
            <div style={{
              background: "none",
              boxShadow: "none",
              borderRadius: "0",
              width: "auto",
              padding: "0",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center"
            }}>
              <img src={bmrImg} alt="BMR" style={{ width: 350 }} />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}