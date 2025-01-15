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
      <Text style={{ width: "25%", fontSize: 9, textAlign: "center" }}>
        {time ?? ""}
      </Text>
      <Text style={styles.textAmount}>{amount}</Text>
    </View>
  );
};

const DeductionItem = ({ data, border = false, bold = false }) => {
  const { item, amount = "" } = data;
  const style = { ...styles.salaryTableSection };
  if (border) {
    style.borderTop = "0.5";
  }
  if (bold) {
    style.fontFamily = "Verdana";
  }
  return (
    <View style={style}>
      <Text style={{ ...styles.salaryItem, width: "75%" }}>{item}</Text>
      <Text style={styles.textAmount}>{amount}</Text>
    </View>
  );
};

const PDFFile = ({ sheetData, coveragePeriod = "", payDate = "" }) => {
  const {
    ADDTL_TRANSPO_ALLOWANCE_10th__25th = "",
    Amount_for_Regular_DaysBasic_Pay = "",
    CASH_ADVANCES = "",
    CBS = "",
    DAYS_ABSENT = "",
    DAYS_ABSENT_AMOUNT = "",
    DEDUCTIONS = "",
    DEMINIMIS_25th = "",
    DOUBLE_HOLIDAY = "",
    DOUBLE_HOLIDAY_200_AMOUNT = "",
    DOUBLE_HOLIDAY_OT = "",
    DOUBLE_HOLIDAY_OT_390_AMOUNT = "",
    DOUBLE_HOLIDAY_REST_DAY = "",
    DOUBLE_HOLIDAY_REST_DAY_390_AMOUNT = "",
    DOUBLE_HOLIDAY_REST_DAY_OT = "",
    DOUBLE_HOLIDAY_REST_DAY_OT_507_AMOUNT = "",
    FOOD_ALLOWANCES_10th__25th = "",
    Floor_Name = "",
    Gross_Pay_with_Allowances = "",
    HDMF_Loan = "",
    HDMF____EE = "",
    HOLIDAY_PAY_MWE = "",
    Holiday_Pay__UNWORKED = "",
    INCENTIVES_KPI_QUALIFYING_POSITION_6TH_DAYSIGNING_BONUSMONETARY_INCENTIVESOTHERS = "",
    LATEUT = "",
    LATEUT_AMOUNT = "",
    LEGAL_HOLIDAY = "",
    LEGAL_HOLIDAY_100_AMOUNT = "",
    LEGAL_HOLIDAY_OT = "",
    LEGAL_HOLIDAY_OT_260_AMOUNT = "",
    LEGAL_HOLIDAY_REST_DAY = "",
    LEGAL_HOLIDAY_REST_DAY_260_AMOUNT = "",
    Location = "",
    MAKE_UP_ALLOWANCE_PHP25day_10th__25th = "",
    MISSED_CLASS = "",
    Monthly_Rate = "",
    NDOT_2022 = "",
    NDOT_2023 = "",
    NET_PAY = "",
    NIGHT_DIFFERENTIAL = "",
    NIGHT_DIFFERENTIAL_10_AMOUNT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_20_AMOUNT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_OT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_OT_286_AMOUNT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_26_AMOUNT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_OT = "",
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_OT_37180_AMOUNT = "",
    NIGHT_DIFFERENTIAL_OT = "",
    NIGHT_DIFFERENTIAL_OT_13750_AMOUNT = "",
    NIGHT_DIFFERENTIAL_REST_DAY = "",
    NIGHT_DIFFERENTIAL_REST_DAY_13_AMOUNT = "",
    NIGHT_DIFFERENTIAL_REST_DAY_OT = "",
    NIGHT_DIFFERENTIAL_REST_DAY_OT_18590_AMOUNT = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_13_AMOUNT = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_OT = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_OT_18590_AMOUNT = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY__REST_DAY = "",
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY__REST_DAY_15_AMOUNT = "",
    NIGHT_DIFFERENTIAL__DOUBLE_HOLIDAY = "",
    NIGHT_DIFFERENTIAL__DOUBLE_HOLIDAY_30_AMOUNT = "",
    Name = "",
    PAI_10th__25th = "",
    PHILHEALTH_EE = "",
    REFERRAL_FEES_10th__25th = "",
    REGULAR_OT = "",
    REGULAR_OT_125_AMOUNT = "",
    REST_DAY = "",
    REST_DAY_130_AMOUNT = "",
    REST_DAY_OT = "",
    REST_DAY_OT_169_AMOUNT = "",
    SLVLPL = "",
    SPECIAL_HOLIDAY = "",
    SPECIAL_HOLIDAY_30_AMOUNT = "",
    SPECIAL_HOLIDAY_OT = "",
    SPECIAL_HOLIDAY_OT_169_AMOUNT = "",
    SPECIAL_HOLIDAY_REST_DAY = "",
    SPECIAL_HOLIDAY_REST_DAY_150_AMOUNT = "",
    SPECIAL_HOLIDAY_REST_DAY_OT = "",
    SPECIAL_HOLIDAY_REST_DAY_OT_195_AMOUNT = "",
    SSS_EE = "",
    SSS_Loan = "",
    TAX_REFUNDPAYABLE = "",
    TOTAL_ADJUSTMENT = "",
    TRAINING_FEES_10th__25th = "",
    TRANSPO_ALLOWANCE_10th__25th = "",
    Unused_VL_2023 = "",
    WITHOLDING_TAX = "",
    _13th_Month_Pay = "",
    __EMPTY = "",
    _DEDUCTIONS = "",
  } = sheetData;

  const earnings = [
    Gross_Pay_with_Allowances,
    Amount_for_Regular_DaysBasic_Pay,
    REFERRAL_FEES_10th__25th,
    HOLIDAY_PAY_MWE,
    REST_DAY_130_AMOUNT,
    DOUBLE_HOLIDAY_200_AMOUNT,
    DOUBLE_HOLIDAY_REST_DAY_390_AMOUNT,
    LEGAL_HOLIDAY_100_AMOUNT,
    LEGAL_HOLIDAY_100_AMOUNT,
    SPECIAL_HOLIDAY_30_AMOUNT,
    SPECIAL_HOLIDAY_REST_DAY_150_AMOUNT,
    REGULAR_OT_125_AMOUNT,
    REST_DAY_OT_169_AMOUNT,
    DOUBLE_HOLIDAY_OT_390_AMOUNT,
    DOUBLE_HOLIDAY_REST_DAY_OT_507_AMOUNT,
    LEGAL_HOLIDAY_OT_260_AMOUNT,
    LEGAL_HOLIDAY_REST_DAY_260_AMOUNT,
    SPECIAL_HOLIDAY_OT_169_AMOUNT,
    SPECIAL_HOLIDAY_REST_DAY_OT_195_AMOUNT,
    NIGHT_DIFFERENTIAL_10_AMOUNT,
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_20_AMOUNT,
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_OT_286_AMOUNT,
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_13_AMOUNT,
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_OT_18590_AMOUNT,
    NIGHT_DIFFERENTIAL_REST_DAY_13_AMOUNT,
    NIGHT_DIFFERENTIAL_REST_DAY_OT_18590_AMOUNT,
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_26_AMOUNT,
    NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_OT_37180_AMOUNT,
    NIGHT_DIFFERENTIAL_OT_13750_AMOUNT,
    NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY__REST_DAY_15_AMOUNT,
    NIGHT_DIFFERENTIAL__DOUBLE_HOLIDAY_30_AMOUNT,
    INCENTIVES_KPI_QUALIFYING_POSITION_6TH_DAYSIGNING_BONUSMONETARY_INCENTIVESOTHERS,
    PAI_10th__25th,
    ADDTL_TRANSPO_ALLOWANCE_10th__25th,
    REFERRAL_FEES_10th__25th,
    TRAINING_FEES_10th__25th,
    DEMINIMIS_25th,
    FOOD_ALLOWANCES_10th__25th,
    TRANSPO_ALLOWANCE_10th__25th,
    MAKE_UP_ALLOWANCE_PHP25day_10th__25th,
    TOTAL_ADJUSTMENT,
    NDOT_2022,
    NDOT_2023,
    Unused_VL_2023,
    _13th_Month_Pay,
    TAX_REFUNDPAYABLE,
  ];

  const deductions = [
    SSS_EE,
    SSS_Loan,
    HDMF____EE,
    HDMF_Loan,
    PHILHEALTH_EE,
    WITHOLDING_TAX,
    DAYS_ABSENT_AMOUNT,
    LATEUT_AMOUNT,
    MISSED_CLASS,
    CASH_ADVANCES,
    CBS,
    DEDUCTIONS,
    SLVLPL,
  ];

  const computeTotal = (type) => {
    let total = type === "earnings" ? Monthly_Rate / 2 : 0;

    const values = type === "earnings" ? earnings : deductions;

    values.forEach((value) => {
      if (typeof value === "number") {
        total = total + Number.isInteger(value) ? value : Math.floor(value);
      } else if (typeof value === "string" && /^[+-]?\d+$/.test(value.trim())) {
        total = total + parseInt(value, 10);
      } else total = total + 0;
    });

    return total;
  };

  console.log(sheetData);

  return (
    <Document>
      <Page size={"A4"} style={styles.page}>
        <Text style={styles.header}>Payslip</Text>
        <Text style={{ fontFamily: "Verdana", fontSize: 10, marginBottom: 2 }}>
          Employee Details
        </Text>
        <View style={styles.section}>
          <Text style={styles.generalInfo}>Name: {Name}</Text>
          <Text style={styles.generalInfo}>Floor Name: {Floor_Name}</Text>
          <Text style={styles.generalInfo}>Department: {Location}</Text>
          <Text style={styles.generalInfo}>Payslip Number: {__EMPTY}</Text>
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
                }}
              >
                Amount
              </Text>
            </View>
            <View style={styles.salaryTableSection}>
              <Text style={styles.salaryItem}>Basic Salary</Text>
              <Text style={{ width: "25%", height: 20 }}></Text>
              <Text style={styles.textAmount}>
                {Amount_for_Regular_DaysBasic_Pay}
              </Text>
            </View>
            <EarningItem
              border
              data={{
                item: "Reg.Holiday (Unwork)",
                time: Holiday_Pay__UNWORKED,
                amount: HOLIDAY_PAY_MWE,
              }}
            />
            <EarningItem
              data={{
                item: "RestDay Work",
                time: REST_DAY,
                amount: REST_DAY_130_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday",
                time: DOUBLE_HOLIDAY,
                amount: DOUBLE_HOLIDAY_200_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "RD+Double Holiday",
                time: DOUBLE_HOLIDAY_REST_DAY,
                amount: DOUBLE_HOLIDAY_REST_DAY_390_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (Work)",
                time: LEGAL_HOLIDAY,
                amount: LEGAL_HOLIDAY_100_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday",
                time: LEGAL_HOLIDAY_REST_DAY,
                amount: LEGAL_HOLIDAY_100_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday",
                time: SPECIAL_HOLIDAY,
                amount: SPECIAL_HOLIDAY_30_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "RD+Special Holiday",
                time: SPECIAL_HOLIDAY_REST_DAY,
                amount: SPECIAL_HOLIDAY_REST_DAY_150_AMOUNT,
              }}
            />
            <EarningItem
              border
              data={{
                item: "Regular (OT)",
                time: REGULAR_OT,
                amount: REGULAR_OT_125_AMOUNT.toFixed(3),
              }}
            />
            <EarningItem
              data={{
                item: "Rest Day OT",
                time: REST_DAY_OT,
                amount: REST_DAY_OT_169_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday (OT)",
                time: DOUBLE_HOLIDAY_OT,
                amount: DOUBLE_HOLIDAY_OT_390_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Double Holiday RestDay (OT)",
                time: DOUBLE_HOLIDAY_REST_DAY_OT,
                amount: DOUBLE_HOLIDAY_REST_DAY_OT_507_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Reg.Holiday (OT)",
                time: LEGAL_HOLIDAY_OT,
                amount: LEGAL_HOLIDAY_OT_260_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "RD+Reg.Holiday (OT)",
                time: LEGAL_HOLIDAY_REST_DAY,
                amount: LEGAL_HOLIDAY_REST_DAY_260_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "Special Holiday (OT)",
                time: SPECIAL_HOLIDAY_OT,
                amount: SPECIAL_HOLIDAY_OT_169_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "RD/Special Holiday(OT)",
                time: SPECIAL_HOLIDAY_REST_DAY_OT,
                amount: SPECIAL_HOLIDAY_REST_DAY_OT_195_AMOUNT,
              }}
            />
            <EarningItem
              border
              data={{
                item: "Night Diff",
                time: NIGHT_DIFFERENTIAL,
                amount: NIGHT_DIFFERENTIAL_10_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday",
                time: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY,
                amount: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_20_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Reg Holiday OT",
                time: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_OT,
                amount: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY_OT_286_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday",
                time: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY,
                amount: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_13_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Special Holiday OT",
                time: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_OT,
                amount: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY_OT_18590_AMOUNT,
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
                time: NIGHT_DIFFERENTIAL_REST_DAY,
                amount: NIGHT_DIFFERENTIAL_REST_DAY_13_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Rest Day (OT)",
                time: NIGHT_DIFFERENTIAL_REST_DAY_OT,
                amount: NIGHT_DIFFERENTIAL_REST_DAY_OT_18590_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day",
                time: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY,
                amount: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_26_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Regular+Rest Day (OT)",
                time: NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_OT,
                amount:
                  NIGHT_DIFFERENTIAL_LEGAL_HOLIDAY__REST_DAY_OT_37180_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Overtime",
                time: NIGHT_DIFFERENTIAL_OT,
                amount: NIGHT_DIFFERENTIAL_OT_13750_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Special/Rest Day",
                time: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY__REST_DAY,
                amount: NIGHT_DIFFERENTIAL_SPECIAL_HOLIDAY__REST_DAY_15_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "ND Double Holiday",
                time: NIGHT_DIFFERENTIAL__DOUBLE_HOLIDAY,
                amount: NIGHT_DIFFERENTIAL__DOUBLE_HOLIDAY_30_AMOUNT,
              }}
            />
            <EarningItem
              data={{
                item: "KPI/Qualifying Incentive/6-work day",
                amount:
                  INCENTIVES_KPI_QUALIFYING_POSITION_6TH_DAYSIGNING_BONUSMONETARY_INCENTIVESOTHERS,
              }}
            />
            <EarningItem
              data={{
                item: "Perfect Attendance",
                amount: PAI_10th__25th,
              }}
            />
            <EarningItem
              data={{
                item: "Special Allowance",
                amount: ADDTL_TRANSPO_ALLOWANCE_10th__25th,
              }}
            />
            <EarningItem
              data={{
                item: "Referral Fees",
                amount: REFERRAL_FEES_10th__25th,
              }}
            />
            <EarningItem
              data={{
                item: "Training Fees",
                amount: TRAINING_FEES_10th__25th,
              }}
            />
            <EarningItem
              border
              data={{
                item: "Deminimis",
                amount: DEMINIMIS_25th,
              }}
            />
            <EarningItem
              data={{
                item: "Food",
                amount: FOOD_ALLOWANCES_10th__25th,
              }}
            />
            <EarningItem
              data={{
                item: "Transpo",
                amount: TRANSPO_ALLOWANCE_10th__25th,
              }}
            />
            <EarningItem
              data={{
                item: "Make-Up",
                amount: MAKE_UP_ALLOWANCE_PHP25day_10th__25th,
              }}
            />
            <EarningItem
              border
              data={{
                item: "Salary Adjustment",
                amount: TOTAL_ADJUSTMENT,
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2022)",
                amount: NDOT_2022,
              }}
            />
            <EarningItem
              data={{
                item: "SA (NDOT 2023)",
                amount: NDOT_2023,
              }}
            />
            <EarningItem
              data={{
                item: "Unused VL 2023",
                amount: Unused_VL_2023,
              }}
            />
            <EarningItem
              data={{
                item: "13th Month Pay",
                amount: _13th_Month_Pay,
              }}
            />
            <EarningItem
              data={{
                item: "Tax Refund/Payables",
                amount: TAX_REFUNDPAYABLE,
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
                  amount: SSS_EE.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "SSS Loan",
                  amount: SSS_Loan.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Contribution",
                  amount: HDMF____EE.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Pag-ibig Loan",
                  amount: HDMF_Loan.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Philhealth Contribution",
                  amount: PHILHEALTH_EE.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Witholding Tax",
                  amount: WITHOLDING_TAX.toFixed(3),
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Absent",
                  time: DAYS_ABSENT,
                  amount: DAYS_ABSENT_AMOUNT,
                }}
              />
              <DeductionItem
                data={{
                  item: "Tardiness",
                  time: LATEUT,
                  amount: LATEUT_AMOUNT,
                }}
              />
              <DeductionItem
                data={{
                  item: "Missed Class",
                  amount: MISSED_CLASS,
                }}
              />
              <DeductionItem
                border
                data={{
                  item: "Cash Advance",
                  amount: CASH_ADVANCES,
                }}
              />
              <DeductionItem
                data={{
                  item: "CBS",
                  amount: CBS,
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
                  amount: Gross_Pay_with_Allowances.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Deduction",
                  amount: _DEDUCTIONS.toFixed(3),
                }}
              />
              <DeductionItem
                data={{
                  item: "Total Leave Benefit",
                  amount: "",
                }}
              />

              <DeductionItem
                border
                bold
                data={{
                  item: "NET SALARY",
                  amount: NET_PAY.toFixed(3),
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
                {Name}
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
