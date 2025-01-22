
import { StyleSheet } from "@react-pdf/renderer";
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

export default styles