import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {},
  bg: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    height: "100%",
  },
  logo: {
    flex: 1,
    height: 300,
    width: 120,
    alignSelf: "center",
    margin: 30,
    marginTop: 50,
  },
  err: {
    height: 20,
    color: "red",
    alignSelf: "center",
  },
  input: {
    fontWeight: 'bold',
    height: 48,
    borderRadius: 5,
    overflow: "hidden",
    color: 'whitesmoke',
    backgroundColor: 'transparent',
    borderColor: 'whitesmoke', 
    borderStyle: 'solid', 
    borderWidth: 1.5, 
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: "rgba(255, 255, 255, 0.75)",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonTitle: {
    color: 'rgba(0, 0, 0, 0.7)',
    fontSize: 16,
    fontWeight: "bold",
  },
  footerView: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: "whitesmoke",
  },
  footerLink: {
    color: '#c9b07d',
    fontWeight: "bold",
    fontSize: 16,
  },
});
