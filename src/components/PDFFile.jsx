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
  console.log(sheetData);
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
                time: sheetData.G || "-",
                amount: sheetData.H || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RestDay Work",
                time: sheetData.W || "-",
                amount: sheetData.X || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday",
                time: sheetData.AA || "-",
                amount: sheetData.AB || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Double Holiday",
                time: sheetData.AE || "-",
                amount: sheetData.AF || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (Work)",
                time: sheetData.AI || "-",
                amount: sheetData.AJ || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday",
                time: sheetData.AM || "-",
                amount: sheetData.AN || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday",
                time: sheetData.AQ || "-",
                amount: sheetData.AR || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Special Holiday",
                time: sheetData.AU || "-",
                amount: sheetData.AV || "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Regular (OT)",
                time: sheetData.U || "-",
                amount: sheetData.V || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Rest Day OT",
                time: sheetData.Y || "-",
                amount: sheetData.Z || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday (OT)",
                time: sheetData.AC || "-",
                amount: sheetData.AD || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday RestDay (OT)",
                time: sheetData.AG || "-",
                amount: sheetData.AH || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (OT)",
                time: sheetData.AK || "-",
                amount: sheetData.AL || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday (OT)",
                time: sheetData["AO"] || "-",
                amount: sheetData["AP"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday (OT)",
                time: sheetData["AS"] || "-",
                amount: sheetData["AT"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "RD/Special Holiday(OT)",
                time: sheetData["AW"] || "-",
                amount: sheetData["AX"] || "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Night Diff",
                time: sheetData["AY"] || "-",
                amount: sheetData["AZ"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday",
                time: sheetData["BE"] || "-",
                amount: sheetData["BF"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday OT",
                time: sheetData["BK"] || "-",
                amount: sheetData["BL"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday",
                time: sheetData["BG"] || "-",
                amount: sheetData["BH"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday OT",
                time: sheetData["BM"] || "-",
                amount: sheetData["BN"] || "-",
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
                time: sheetData["BO"] || "-",
                amount: sheetData["BP"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Rest Day (OT)",
                time: sheetData["BW"] || "-",
                amount: sheetData["BX"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day",
                time: sheetData["BS"] || "-",
                amount: sheetData["BT"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day (OT)",
                time: sheetData["CA"] || "-",
                amount: sheetData["CB"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Overtime",
                time: sheetData["BA"] || "-",
                amount: sheetData["BB"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Special/Rest Day",
                time: sheetData["BU"] || "-",
                amount: sheetData["BV"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "ND Double Holiday",
                time: sheetData["BC"] || "-",
                amount: sheetData["BD"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "KPI/Qualifying Incentive/6-work day",
                amount: sheetData["CI"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Perfect Attendance",
                amount: sheetData["CK"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Special Allowance",
                amount: sheetData["CJ"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Referral Fees",
                amount: sheetData["CL"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Training Fees",
                amount: sheetData["CM"] || "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Deminimis",
                amount: sheetData["CH"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Food",
                amount: sheetData["CN"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Transpo",
                amount: sheetData["CO"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Make-Up",
                amount: sheetData["CP"] || "-",
              }}
            />
            <EarningItem
              border
              data={{
                item: "Salary Adjustment",
                amount: sheetData["HE"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2022)",
                amount: sheetData["HC"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2023)",
                amount: sheetData["HD"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Unused VL 2023",
                amount: sheetData["CG"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "13th Month Pay",
                amount: sheetData["DI"] || "-",
              }}
            />
            <EarningItem
              data={{
                item: "Tax Refund/Payables",
                amount: sheetData["DK"] || sheetData["HB"] || "-",
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
                  amount: sheetData["CU"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "SSS Loan",
                  amount: sheetData["CX"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Contribution",
                  amount: sheetData["DB"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Loan",
                  amount: sheetData["DE"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Philhealth Contribution",
                  amount: sheetData["CY"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Witholding Tax",
                  amount: sheetData["DF"] || "-",
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Absent",
                  qty: sheetData["I"] || "-",
                  amount: sheetData["J"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Tardiness",
                  qty: sheetData["N"],
                  amount: sheetData["O"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Missed Class",
                  amount: sheetData["CT"] || "-",
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Cash Advance",
                  amount: sheetData["CR"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "CBS",
                  amount: sheetData["CS"] || "-",
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
                  amount: sheetData["CQ"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Deduction",
                  amount: sheetData["DG"] || "-",
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Leave Benefit",
                  amount: sheetData["CF"] || sheetData["GO"] || "-",
                }}
              />

              <DeductionItem
                border
                bold
                data={{
                  item: "NET SALARY",
                  amount: sheetData["DL"] || "-",
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
                {sheetData["C"] || "-"}
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
