import React from "react";
import Verdana from "../assets/fonts/verdanab.ttf";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { forEach } from "jszip";

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  section: {
    marginBottom: 10,
    padding: 5,
    border: "0.5",
  },
  header: {
    fontSize: 12,
    marginBottom: 10,
    textAlign: "start",
    textTransform: "uppercase",
    fontFamily: "Verdana",
  },
  generalInfo: {
    fontSize: 10,
    marginBottom: 1,
  },
  salaryTable: {
    fontSize: 12,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    border: "0.5",
  },
  salaryTableSection: {
    display: "flex",
    flexDirection: "row",
  },

  salaryTableTitle: {
    fontSize: 10,
    fontFamily: "Verdana",
    width: "100%",
    textAlign: "center",
    backgroundColor: "#F8CBAD",
  },
  salaryTableSubtitle: {
    fontSize: 9,
    fontFamily: "Verdana",
    paddingLeft: 5,
  },
  salaryItem: {
    width: "50%%",
    fontSize: 10,
    paddingLeft: 5,
    paddingBottom: 1,
  },
  textAmount: {
    width: "25%%",
    fontSize: 10,
    backgroundColor: "#f5e1d4",
    paddingLeft: 5,
    paddingBottom: 1,
    textAlign: "center",
  },
  total: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "bold",
  },
  signature: {
    marginTop: 30,
    textAlign: "right",
    fontSize: 12,
  },
});

Font.register({
  family: "Verdana",
  src: Verdana,
});

const EarningItem = ({ data, border = false }) => {
  const { item, time = null, amount } = data;
  const style = { ...styles.salaryTableSection };
  if (border) {
    style.borderTop = "0.5";
  }
  return (
    <View style={style}>
      <Text style={styles.salaryItem}>{item}</Text>
      <Text
        style={{
          width: "25%",
          fontSize: 9,
          textAlign: "center",
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {time ?? ""}
      </Text>
      <Text
        style={{
          ...styles.textAmount,
          overflow: "hidden",
          textOverflow: "clip",
        }}
      >
        {amount}
      </Text>
    </View>
  );
};

const DeductionItem = ({ data, border = false, bold = false }) => {
  const { item, amount = "", qty = null } = data;
  const style = { ...styles.salaryTableSection };
  if (border) {
    style.borderTop = "0.5";
  }
  if (bold) {
    style.fontFamily = "Verdana";
  }
  return (
    <View style={style}>
      <Text style={{ ...styles.salaryItem, width: qty ? "65%" : "75%" }}>
        {item}
      </Text>
      {qty && (
        <Text style={{ ...styles.salaryItem, width: "10%", textAlign: "end" }}>
          {qty}
        </Text>
      )}
      <Text style={{ ...styles.textAmount, textAlign: "center" }}>
        {amount}
      </Text>
    </View>
  );
};

const PDFFile = ({
  sheetData,
  transformedData,
  coveragePeriod = "",
  payDate = "",
}) => {
  const getTotal = (arr, _13month = 0) => {
    let total = _13month;
    arr.forEach((a) => {
      if (typeof a === "number") {
        total += Math.abs(a);
      }

      return;
    });

    return total.toFixed(2);
  };

  const totalDeduction = getTotal([sheetData.J, sheetData.O, sheetData.DG]);
  const totalEarnings = getTotal(
    [
      sheetData.DM / 2,
      sheetData.CF,
      sheetData.H,
      sheetData.X,
      sheetData.AB,
      sheetData.AF,
      sheetData.AJ,
      sheetData.AN,
      sheetData.AR,
      sheetData.AV,
      sheetData.V,
      sheetData.Z,
      sheetData.AD,
      sheetData.AH,
      sheetData.AL,
      sheetData.AP,
      sheetData.AT,
      sheetData.AX,
      sheetData.AZ,
      sheetData.BF,
      sheetData.BL,
      sheetData.BH,
      sheetData.BN,
      sheetData.BP,
      sheetData.BX,
      sheetData.BT,
      sheetData.CB,
      sheetData.BB,
      sheetData.BV,
      sheetData.BD,
      sheetData.CK,
      sheetData.CJ,
      sheetData.CL,
      sheetData.CM,
      sheetData.CH,
      sheetData.CN,
      sheetData.CO,
      sheetData.CP,
      sheetData.HE,
      sheetData.HC,
      sheetData.HD,
      sheetData.CG,
      sheetData.DK,
    ],
    sheetData.DI
  );

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.header}>Payslip</Text>
        <Text style={{ fontFamily: "Verdana", fontSize: 10, marginBottom: 2 }}>
          Employee Details
        </Text>
        <View style={styles.section}>
          <Text style={styles.generalInfo}>Name: {sheetData.C}</Text>
          <Text style={styles.generalInfo}>Floor Name: {sheetData.B}</Text>
          <Text style={styles.generalInfo}>Department: {sheetData.HJ}</Text>
          <Text style={styles.generalInfo}>Payslip Number: {sheetData.A}</Text>
        </View>
        <View
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "row",
            marginBottom: 2,
          }}
        >
          <Text style={{ ...styles.generalInfo, width: "50%" }}>
            Coverage Period : {coveragePeriod}
          </Text>
          <Text style={{ ...styles.generalInfo, width: "50%" }}>
            Pay Date : {payDate}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              width: "100%",
              border: "0.5",
            }}
          >
            <Text style={styles.salaryTableTitle}>EARNINGS</Text>
            <View style={{ ...styles.salaryTableSection, borderBottom: "0.5" }}>
              <Text style={{ ...styles.salaryTableSubtitle, width: "50%" }}>
                Salary Heads
              </Text>
              <Text style={{ ...styles.salaryTableSubtitle, width: "25%" }}>
                Hours/Days
              </Text>
              <Text
                style={{
                  ...styles.salaryTableSubtitle,
                  width: "25%",
                  backgroundColor: "#f5e1d4",
                  textAlign: "center",
                }}
              >
                Amount
              </Text>
            </View>
            <View style={styles.salaryTableSection}>
              <Text style={styles.salaryItem}>Basic Salary</Text>
              <Text style={{ width: "25%", height: 20 }}></Text>
              <Text style={styles.textAmount}>{sheetData.DM / 2}</Text>
            </View>
            <EarningItem
              border
              data={{
                item: "Reg.Holiday (Unwork)",
                time: sheetData.G
                  ? typeof sheetData.G === "number"
                    ? sheetData.G.toFixed(2)
                    : sheetData.G
                  : "-",
                amount: sheetData.H
                  ? typeof sheetData.H === "number"
                    ? sheetData.H.toFixed(2)
                    : sheetData.H
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RestDay Work",
                time: sheetData.W
                  ? typeof sheetData.W === "number"
                    ? sheetData.W.toFixed(2)
                    : sheetData.W
                  : "-",
                amount: sheetData.X
                  ? typeof sheetData.X === "number"
                    ? sheetData.X.toFixed(2)
                    : sheetData.X
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday",
                time: sheetData.AA
                  ? typeof sheetData.AA === "number"
                    ? sheetData.AA.toFixed(2)
                    : sheetData.AA
                  : "-",
                amount: sheetData.AB
                  ? typeof sheetData.AB === "number"
                    ? sheetData.AB.toFixed(2)
                    : sheetData.AB
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Double Holiday",
                time: sheetData.AE
                  ? typeof sheetData.AE === "number"
                    ? sheetData.AE.toFixed(2)
                    : sheetData.AE
                  : "-",
                amount: sheetData.AF
                  ? typeof sheetData.AF === "number"
                    ? sheetData.AF.toFixed(2)
                    : sheetData.AF
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (Work)",
                time: sheetData.AI
                  ? typeof sheetData.AI === "number"
                    ? sheetData.AI.toFixed(2)
                    : sheetData.AI
                  : "-",
                amount: sheetData.AJ
                  ? typeof sheetData.AJ === "number"
                    ? sheetData.AJ.toFixed(2)
                    : sheetData.AJ
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday",
                time: sheetData.AM
                  ? typeof sheetData.AM === "number"
                    ? sheetData.AM.toFixed(2)
                    : sheetData.AM
                  : "-",
                amount: sheetData.AN
                  ? typeof sheetData.AN === "number"
                    ? sheetData.AN.toFixed(2)
                    : sheetData.AN
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday",
                time: sheetData.AQ
                  ? typeof sheetData.AQ === "number"
                    ? sheetData.AQ.toFixed(2)
                    : sheetData.AQ
                  : "-",
                amount: sheetData.AR
                  ? typeof sheetData.AR === "number"
                    ? sheetData.AR.toFixed(2)
                    : sheetData.AR
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Special Holiday",
                time: sheetData.AU
                  ? typeof sheetData.AU === "number"
                    ? sheetData.AU.toFixed(2)
                    : sheetData.AU
                  : "-",
                amount: sheetData.AV
                  ? typeof sheetData.AV === "number"
                    ? sheetData.AV.toFixed(2)
                    : sheetData.AV
                  : "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Regular (OT)",
                time: sheetData.U
                  ? typeof sheetData.U === "number"
                    ? sheetData.U.toFixed(2)
                    : sheetData.U
                  : "-",
                amount: sheetData.V
                  ? typeof sheetData.V === "number"
                    ? sheetData.V.toFixed(2)
                    : sheetData.V
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Rest Day OT",
                time: sheetData.Y
                  ? typeof sheetData.Y === "number"
                    ? sheetData.Y.toFixed(2)
                    : sheetData.Y
                  : "-",
                amount: sheetData.Z
                  ? typeof sheetData.Z === "number"
                    ? sheetData.Z.toFixed(2)
                    : sheetData.Z
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday (OT)",
                time: sheetData.AC
                  ? typeof sheetData.AC === "number"
                    ? sheetData.AC.toFixed(2)
                    : sheetData.AC
                  : "-",
                amount: sheetData.AD
                  ? typeof sheetData.AD === "number"
                    ? sheetData.AD.toFixed(2)
                    : sheetData.AD
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday RestDay (OT)",
                time: sheetData.AG
                  ? typeof sheetData.AG === "number"
                    ? sheetData.AG.toFixed(2)
                    : sheetData.AG
                  : "-",
                amount: sheetData.AH
                  ? typeof sheetData.AH === "number"
                    ? sheetData.AH.toFixed(2)
                    : sheetData.AH
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (OT)",
                time: sheetData.AK
                  ? typeof sheetData.AK === "number"
                    ? sheetData.AK.toFixed(2)
                    : sheetData.AK
                  : "-",
                amount: sheetData.AL
                  ? typeof sheetData.AL === "number"
                    ? sheetData.AL.toFixed(2)
                    : sheetData.AL
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday (OT)",
                time: sheetData["AO"]
                  ? typeof sheetData.AO === "number"
                    ? sheetData.AO.toFixed(2)
                    : sheetData.AO
                  : "-",
                amount: sheetData["AP"]
                  ? typeof sheetData.AP === "number"
                    ? sheetData.AP.toFixed(2)
                    : sheetData.AP
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday (OT)",
                time: sheetData["AS"]
                  ? typeof sheetData.AS === "number"
                    ? sheetData.AS.toFixed(2)
                    : sheetData.AS
                  : "-",
                amount: sheetData["AT"]
                  ? typeof sheetData.AT === "number"
                    ? sheetData.AT.toFixed(2)
                    : sheetData.AT
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD/Special Holiday(OT)",
                time: sheetData["AW"]
                  ? typeof sheetData.AW === "number"
                    ? sheetData.AW.toFixed(2)
                    : sheetData.AW
                  : "-",
                amount: sheetData["AX"]
                  ? typeof sheetData.AX === "number"
                    ? sheetData.AX.toFixed(2)
                    : sheetData.AX
                  : "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Night Diff",
                time: sheetData["AY"]
                  ? typeof sheetData.AY === "number"
                    ? sheetData.AY.toFixed(2)
                    : sheetData.AY
                  : "-",
                amount: sheetData["AZ"]
                  ? typeof sheetData.AZ === "number"
                    ? sheetData.AZ.toFixed(2)
                    : sheetData.AZ
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday",
                time: sheetData["BE"]
                  ? typeof sheetData.BE === "number"
                    ? sheetData.BE.toFixed(2)
                    : sheetData.BE
                  : "-",
                amount: sheetData["BF"]
                  ? typeof sheetData.BF === "number"
                    ? sheetData.BF.toFixed(2)
                    : sheetData.BF
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday OT",
                time: sheetData["BK"]
                  ? typeof sheetData.BK === "number"
                    ? sheetData.BK.toFixed(2)
                    : sheetData.BK
                  : "-",
                amount: sheetData["BL"]
                  ? typeof sheetData.BL === "number"
                    ? sheetData.BL.toFixed(2)
                    : sheetData.BL
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday",
                time: sheetData["BG"]
                  ? typeof sheetData.BG === "number"
                    ? sheetData.BG.toFixed(2)
                    : sheetData.BG
                  : "-",
                amount: sheetData["BH"]
                  ? typeof sheetData.BH === "number"
                    ? sheetData.BH.toFixed(2)
                    : sheetData.BH
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday OT",
                time: sheetData["BM"]
                  ? typeof sheetData.BM === "number"
                    ? sheetData.BM.toFixed(2)
                    : sheetData.BM
                  : "-",
                amount: sheetData["BN"]
                  ? typeof sheetData.BN === "number"
                    ? sheetData.BN.toFixed(2)
                    : sheetData.BN
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Special Holiday",
              }}
            />
            <EarningItem
              data={{
                item: "ND Rest Day",
                time: sheetData["BO"]
                  ? typeof sheetData.BO === "number"
                    ? sheetData.BO.toFixed(2)
                    : sheetData.BO
                  : "-",
                amount: sheetData["BP"]
                  ? typeof sheetData.BP === "number"
                    ? sheetData.BP.toFixed(2)
                    : sheetData.BP
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Rest Day (OT)",
                time: sheetData["BW"]
                  ? typeof sheetData.BW === "number"
                    ? sheetData.BW.toFixed(2)
                    : sheetData.BW
                  : "-",
                amount: sheetData["BX"]
                  ? typeof sheetData.BX === "number"
                    ? sheetData.BX.toFixed(2)
                    : sheetData.BX
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day",
                time: sheetData["BS"]
                  ? typeof sheetData.BS === "number"
                    ? sheetData.BS.toFixed(2)
                    : sheetData.BS
                  : "-",
                amount: sheetData["BT"]
                  ? typeof sheetData.BT === "number"
                    ? sheetData.BT.toFixed(2)
                    : sheetData.BT
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day (OT)",
                time: sheetData["CA"]
                  ? typeof sheetData.CA === "number"
                    ? sheetData.CA.toFixed(2)
                    : sheetData.CA
                  : "-",
                amount: sheetData["CB"]
                  ? typeof sheetData.CB === "number"
                    ? sheetData.CB.toFixed(2)
                    : sheetData.CB
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Overtime",
                time: sheetData["BA"]
                  ? typeof sheetData.BA === "number"
                    ? sheetData.BA.toFixed(2)
                    : sheetData.BA
                  : "-",
                amount: sheetData["BB"]
                  ? typeof sheetData.BB === "number"
                    ? sheetData.BB.toFixed(2)
                    : sheetData.BB
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special/Rest Day",
                time: sheetData["BU"]
                  ? typeof sheetData.BU === "number"
                    ? sheetData.BU.toFixed(2)
                    : sheetData.BU
                  : "-",
                amount: sheetData["BV"]
                  ? typeof sheetData.BV === "number"
                    ? sheetData.BV.toFixed(2)
                    : sheetData.BV
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Double Holiday",
                time: sheetData["BC"]
                  ? typeof sheetData.BC === "number"
                    ? sheetData.BC.toFixed(2)
                    : sheetData.BC
                  : "-",
                amount: sheetData["BD"]
                  ? typeof sheetData.BD === "number"
                    ? sheetData.BD.toFixed(2)
                    : sheetData.BD
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "KPI/Qualifying Incentive/6-work day",
                amount: sheetData["CI"]
                  ? typeof sheetData.CI === "number"
                    ? sheetData.CI.toFixed(2)
                    : sheetData.CI
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Perfect Attendance",
                amount: sheetData["CK"]
                  ? typeof sheetData.CK === "number"
                    ? sheetData.CK.toFixed(2)
                    : sheetData.CK
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Allowance",
                amount: sheetData["CJ"]
                  ? typeof sheetData.CJ === "number"
                    ? sheetData.CJ.toFixed(2)
                    : sheetData.CJ
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Referral Fees",
                amount: sheetData["CL"]
                  ? typeof sheetData.CL === "number"
                    ? sheetData.CL.toFixed(2)
                    : sheetData.CL
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Training Fees",
                amount: sheetData["CM"]
                  ? typeof sheetData.CM === "number"
                    ? sheetData.CM.toFixed(2)
                    : sheetData.CM
                  : "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Deminimis",
                amount: sheetData["CH"]
                  ? typeof sheetData.CH === "number"
                    ? sheetData.CH.toFixed(2)
                    : sheetData.CH
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Food",
                amount: sheetData["CN"]
                  ? typeof sheetData.CN === "number"
                    ? sheetData.CN.toFixed(2)
                    : sheetData.CN
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Transpo",
                amount: sheetData["CO"]
                  ? typeof sheetData.CO === "number"
                    ? sheetData.CO.toFixed(2)
                    : sheetData.CO
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Make-Up",
                amount: sheetData["CP"]
                  ? typeof sheetData.CP === "number"
                    ? sheetData.CP.toFixed(2)
                    : sheetData.CP
                  : "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Salary Adjustment",
                amount: sheetData["HE"]
                  ? typeof sheetData.HE === "number"
                    ? sheetData.HE.toFixed(2)
                    : sheetData.HE
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2022)",
                amount: sheetData["HC"]
                  ? typeof sheetData.HC === "number"
                    ? sheetData.HC.toFixed(2)
                    : sheetData.HC
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2023)",
                amount: sheetData["HD"]
                  ? typeof sheetData.HD === "number"
                    ? sheetData.HD.toFixed(2)
                    : sheetData.HD
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Unused VL 2023",
                amount: sheetData["CG"]
                  ? typeof sheetData.CG === "number"
                    ? sheetData.CG.toFixed(2)
                    : sheetData.CG
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "13th Month Pay",
                amount: sheetData["DI"]
                  ? typeof sheetData.DI === "number"
                    ? sheetData.DI.toFixed(2)
                    : sheetData.DI
                  : "-",
              }}
            />
            <EarningItem
              data={{
                item: "Tax Refund/Payables",
                amount: sheetData["DK"]
                  ? typeof sheetData.DK === "number"
                    ? sheetData.DK.toFixed(2)
                    : sheetData.DK
                  : "-",
              }}
            />
            <View
              style={{
                borderTop: "0.5",
                width: "100%",
                padding: 5,
                height: 60,
              }}
            >
              <Text
                style={{
                  fontFamily: "Verdana",
                  fontSize: 10,
                }}
              >
                Acknowledgement Stub
              </Text>
              <Text
                style={{
                  fontSize: 7,
                  padding: 5,
                }}
              >
                This will acknowledge receipt of my pay from GnGn Eikaiwa
                Phils., Inc.
              </Text>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              border: "0.5",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                width: "100%",
              }}
            >
              <Text style={styles.salaryTableTitle}>DEDUCTIONS</Text>
              <View
                style={{ ...styles.salaryTableSection, borderBottom: "0.5" }}
              >
                <Text style={{ ...styles.salaryTableSubtitle, width: "75%" }}>
                  Mandatory Contributions
                </Text>
                <Text
                  style={{
                    ...styles.salaryTableSubtitle,
                    width: "25%",
                    backgroundColor: "#f5e1d4",
                  }}
                >
                  Amount
                </Text>
              </View>

              <DeductionItem
                data={{
                  item: "SSS Contribution",
                  amount: sheetData["CU"]
                    ? typeof sheetData.CU === "number"
                      ? sheetData.CU.toFixed(2)
                      : sheetData.CU
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "SSS Loan",
                  amount: sheetData["CX"]
                    ? typeof sheetData.CX === "number"
                      ? sheetData.CX.toFixed(2)
                      : sheetData.CX
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Contribution",
                  amount: sheetData["DB"]
                    ? typeof sheetData.DB === "number"
                      ? sheetData.DB.toFixed(2)
                      : sheetData.DB
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Loan",
                  amount: sheetData["DE"]
                    ? typeof sheetData.DE === "number"
                      ? sheetData.DE.toFixed(2)
                      : sheetData.DE
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Philhealth Contribution",
                  amount: sheetData["CY"]
                    ? typeof sheetData.CY === "number"
                      ? sheetData.CY.toFixed(2)
                      : sheetData.CY
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Witholding Tax",
                  amount: sheetData["DF"]
                    ? typeof sheetData.DF === "number"
                      ? sheetData.DF.toFixed(2)
                      : sheetData.DF
                    : "-",
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Absent",
                  qty: sheetData["I"]
                    ? typeof sheetData.I === "number"
                      ? sheetData.I.toFixed(2)
                      : sheetData.I
                    : "-",
                  amount: sheetData["J"]
                    ? typeof sheetData.J === "number"
                      ? sheetData.J.toFixed(2)
                      : sheetData.J
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Tardiness",
                  qty: sheetData["N"]
                    ? typeof sheetData.N === "number"
                      ? sheetData.N.toFixed(2)
                      : sheetData.N
                    : "-",
                  amount: sheetData["O"]
                    ? typeof sheetData.O === "number"
                      ? sheetData.O.toFixed(2)
                      : sheetData.O
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Missed Class",
                  amount: sheetData["CT"]
                    ? typeof sheetData.CT === "number"
                      ? sheetData.CT.toFixed(2)
                      : sheetData.CT
                    : "-",
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Cash Advance",
                  amount: sheetData["CR"]
                    ? typeof sheetData.CR === "number"
                      ? sheetData.CR.toFixed(2)
                      : sheetData.CR
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "CBS",
                  amount: sheetData["CS"]
                    ? typeof sheetData.CS === "number"
                      ? sheetData.CS.toFixed(2)
                      : sheetData.CS
                    : "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Salary Adjustment",
                }}
              />
              <DeductionItem
                border
                bold
                data={{
                  item: "Breakdown",
                }}
              />
              <DeductionItem
                data={{
                  item: "\n",
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Earnings",
                  amount: totalEarnings,
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Deduction",
                  amount: totalDeduction,
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Leave Benefit",
                  amount: sheetData["CF"]
                    ? typeof sheetData.CF === "number"
                      ? sheetData.CF.toFixed(2)
                      : sheetData.CF
                    : "-",
                }}
              />

              <DeductionItem
                border
                bold
                data={{
                  item: "NET SALARY",
                  amount: (totalEarnings - totalDeduction).toFixed(2),
                }}
              />
              <Text style={{ borderTop: "0.5", width: "100%" }} />
            </View>
            <View
              style={{
                borderTop: "0.5",
                width: "100%",
                padding: 10,
                height: 60,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                textAlign: "center",
              }}
            >
              <Text
                style={{
                  fontFamily: "Verdana",
                  fontSize: 10,
                }}
              >
                {sheetData["C"]
                  ? typeof sheetData.C === "number"
                    ? sheetData.C.toFixed(2)
                    : sheetData.C
                  : "-"}
              </Text>
              <Text
                style={{
                  fontFamily: "Verdana",
                  fontSize: 9,
                  paddingTop: 5,
                }}
              >
                Employee Name / Signature and Date Signed
              </Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFFile;
