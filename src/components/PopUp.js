import React , {useState} from 'react'
import ContactForm from './ContactForm'
import logo from "../images/Vector.svg"
import { makeStyles } from "@material-ui/core/styles";
import "../App.css"
import escape from "../images/escape.svg"
import escape2 from "../images/escape2.svg"

const useStyles = makeStyles((theme) => ({
  container:{
    display: "flex",
    height: "939px",
    width: "1112px",
    margin: "auto",
    borderRadius: "15px",
    },
  column1:{
    background: "linear-gradient(90deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
    minWidth: "514px",
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",
    borderRadius: "15px"
  },
  title:{
    fontFamily: "'Poppins', sans-serif",
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "55px",
    lineHeight: "45px",
    textAlign: "center",
    color: "#FAFAFA",
    margin: "0",
    marginTop: "31px",
  },
  subtitle:{
    fontStyle: "normal",
    fontWeight: "bold",
    fontSize: "20px",
    lineHeight: "45px",
    textAlign: "center",
    color: "#FAFAFA",
    margin: "0",
    marginTop: "7px",
    marginLeft:"-28px"
  },
  escapeIcon:{
    top: "11px",
    right: "13px",
    height: "40px",
    width: "40px",
    position: "relative",
    cursor: "pointer"
  },
  contactForm:{
  },
  [theme.breakpoints.down('xs')]: {
    column1:{
      display:"none"
    },
    container:{
      justifyContent: "center",
      width: "361px",
    },
    escapeIcon:{
      height: "33px",
      width: "33px"
    },
  },
  [theme.breakpoints.down('320')]: {
    escapeIcon:{
    },
  }
}))

    
function PopUp({toggle}) {
  const [escapeHighlight, setEscapeHighlight] = useState(false)
  const heighLight = (a) => {
      setEscapeHighlight(a)
  }
  const{
    container,
    column1,
    title,
    subtitle,
    escapeIcon,
    contactForm
  } = useStyles()
  return (
    <div  className={container}>
        <div className={column1}>
          <img src={logo} alt="" />
          <h1 className={title}>PolyMatic</h1>
          <p className={subtitle}>Redesign Everything</p>
        </div>
        <ContactForm heighLight={heighLight} className={contactForm}/>
        <img onClick={() => toggle(false)} alt="" src={ escapeHighlight === true ? escape2 : escape} className={escapeIcon}/>
    </div>
  )
}

export default PopUp
