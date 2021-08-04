
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import clsx from 'clsx';
import PhoneInput from 'react-phone-number-input'
import "./phoneInput.css"
import querystring from 'query-string'

const styles = theme => ({
    container:{
        display: "flex",
        flexDirection: "column",
        alignItems:"center",
        width: "598px",
        marginLeft: "46px",
        marginTop: "53px"
    },
    formContainer:{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    options:{
        cursor: "pointer",
        border: "2px solid #979797",
        boxSizing:  "border-box",
        borderRadius: "10px",
        width: "120px",
        height: "52px",
        fontSize: "25px",
        lineHeight: "30px",
        padding: "9px 42px 13px 39px",
        color: "rgba(0,0,0,0.5)",
    },
    options2:{
        background: "linear-gradient(90deg, #473B7B 0%, #3584A7 51%, #30D2BE 100%)",
        color: "white",
        border: "none"
    },
    time:{
        display: "flex",
        justifyContent: "space-between",
        width: "510px"
    },
    inputs:{
        color: "rgba(0,0,0,0.5)",
        width: "510px",
        height: "52px",
        border: "2px solid #979797",
        boxSizing: "border-box",
        borderRadius: "10px",
        fontSize: "25px",
        paddingLeft: "20px",
        background: "white !important",
        marginBottom:"2px",
        '&:focus': {
            outline: "none !important",
            border: "4px solid #3584A7 !important",
        }
    },
    Labels:{
        fontSize: "30px",
        lineHeight: "36px",
        fontWeight: "700",
        marginBottom: "10px",
        textAlign: "left",
        alignSelf: "flex-start"
    },
    forms:{
        display: "flex",
        flexDirection: "column",
        marginBottom: "20px"
    },
    title:{
        fontSize: "45px",
        lineHeight: "50px",
        textAlign: "center",
        width: "415px",
        fontWeight: "400",
        margin: "10px 0px 28px -30px",
    },
    Continue:{
        marginBottom:"8px",
    },
    caption:{
        fontSize: "14px",
        lineHeight: "17px"
    },  
    phoneInputs:{
        border: "4px solid #3584A7",
        color: "rgba(0,0,0,0.5)",
        width: "510px",
        height: "52px",
        boxSizing: "border-box",
        borderRadius: "10px",
        fontSize: "25px",
        paddingLeft: "20px",
        background: "white !important",
    },
    Name:{
        marginLeft: "12px",
    },
    [theme.breakpoints.down('xs')]: {
        inputs:{
            width: "309px",
            height: "32px",
            borderRadius: "5px",
            fontSize: "15px",
            lineHeight: "18px",
            paddingLeft: "12px",

        },
        phoneInputs:{
            width: "309px",
            height: "32px"
        },
        options:{
            width:"66px",
            height: "32px",
            padding: "0", 
            textAlign: "center",
            fontSize: "15px",
            borderRadius: "5px"
        },
        Labels:{
            fontSize: "20px",
            lineHeight: "24px"
        },
        title:{
            fontSize: "25px",
            lineHeight: "28px",
            width: "230px",
        },
        time:{
            width: "309px",
        },
        Continue:{
            width: "179px",
            height: "44px",
            fontSize: "20px",
            lineHeight: "24px",
            margin: "10px"
        },
        caption:{
            fontSize: "9px",
            lineHeight: "10.8px"
        },
        container:{
            width: "361px",
            height: "587px",
            margin: "0",
            marginTop: "45px"
        },
        forms:{
          marginBottom: "9px"
        }
    },
    [theme.breakpoints.down('321')]: {
        inputs:{
            width: "250px"
        },
        time:{
            width: "250px"
        },
        Labels:{
           fontSize: "14px" 
        },
        container:{
            marginLeft: "30px"
        },
        caption:{
           width: "250px"
        }, 
        options:{
            width: "50px"
        }
    }
});

class ContactForm extends React.Component {
    constructor(props) {
    super();

    this.state = {
        displayName: '',
        Address: '',
        phone: '',
        time: '',
        hear: '',
        clicked: false,
        moveName: true
        };
    }
    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };
    handleSubmit =  event => {
        event.preventDefault();
        if(this.state.displayName === "" || this.state.Address === "" || this.state.phone === ""|| this.state.time === ""  ) {
            alert("Please fill out all mandatory fields!") // or add required to the mandatory input fields
        } 
        else {
            const userInput = querystring.stringify({
                "entry.923575230": this.state.displayName,
                "entry.959771919": this.state.Address,
                "entry.766642417": this.state.time,
                "entry.1470857061": this.state.phone,
                "entry.210369612": this.state.hear,
            });
            axios({
                method: 'post',
                url: 'https://cors-anywhere.herokuapp.com/https://docs.google.com/forms/u/0/d/e/1FAIpQLScWUyeUYn_LuegxlH5SkFfGwXnZ4fW8u2cbFV_Kr4FRS3tTmw/formResponse',
                headers: { 
                'Content-Type': 'application/x-www-form-urlencoded', 
                },
                data : userInput
            })
            .then( (response) => {
            console.log("response sent", response);
            })
            .catch( (error) => {
                console.log(error);
            });
            this.setState({
                displayName: '',
                Address: '',
                phone: '',
                time: '',
                hear: ''
            });
        }
    };
  
    handleTime = event => {
        const { value } = event.target;
        this.setState( {time: value} )
    }

    handleClick = () =>{
        if(this.state.clicked === true){
            this.setState({clicked: false})
        }
    }
    onFocus = (place) => {
        if (place === "phone"){
            this.setState({
            clicked: true
            });
        }
        this.setState({
            moveName: false,
          });
        this.props.heighLight(true)
    }
      
    onBlur = (place) => {
        if (place === "phone"){
            this.setState({
                clicked: false
            });
        }
        this.setState({
          moveName: true
        });
        this.props.heighLight(false)
    }

    render() {
        const { classes } = this.props;
    
        return (
            <div className={classes.container}   id="contact"  >
                <p className={classes.title}>Get a Free Demo. <br/>It’s Completely <span style={{color: "#3584A7", fontWeight: "700"}}>Free!</span></p>
                <form onSubmit={this.handleSubmit} className={classes.formContainer}>
                    <div className={classes.forms}>
                        <label id="name-label" className={this.state.moveName === true ? clsx(classes.Labels, classes.Name) : classes.Labels }> Name <span style={{color:"red"}}>*</span></label> 
                        <input 
                            type="text"  
                            name="displayName"
                            onChange={ this.handleChange}
                            className={classes.inputs}
                            placeholder= "Enter your Name here"
                            value={this.state.displayName}
                            onFocus={this.onFocus}
                            onBlur={ this.onBlur} 
                        />
                    </div>
                    <div className={classes.forms}>
                        <label id="address-label" className={classes.Labels}> Address <span style={{color:"red"}}>*</span></label>
                        <input 
                            type="Address" 
                            name="Address"
                            onChange={this.handleChange}
                            className={classes.inputs}
                            placeholder= "Enter your Address here"
                            onSelect={this.handleSelect}
                            value={this.state.Address}
                            onFocus={this.onFocus}
                            onBlur={ this.onBlur } 
                            />
                    </div>
                    <div className={classes.forms}>
                        <label id="phone-label" className={classes.Labels}> Phone Number <span style={{color:"red"}}>*</span> </label>  
                        <PhoneInput
                            international
                            name= "phone"
                            defaultCountry="IN"
                            value={this.state.phone}
                            onChange={ (value) => this.setState({phone: value})} 
                            className={this.state.clicked === true? classes.phoneInputs : classes.inputs}
                            onFocus={() => this.onFocus("phone")} 
                            onBlur={() => this.onBlur("phone")} 
                        />
                        </div>
                    <div className={classes.forms}>
                        <label id="phone-label" className={classes.Labels}>Select Demo Time <span style={{color:"red"}}>*</span> </label>
                        <div className={classes.time} >
                            <option className={this.state.time === "1 - 2" ? clsx(classes.options2, classes.options) :classes.options} name="time" onClick={this.handleTime} value="1 - 2" href="#1">1-2</option>
                            <option className={this.state.time === "3 - 4" ? clsx(classes.options2, classes.options) :classes.options} name="time" onClick={this.handleTime} value="3 - 4" href="#2">3-4</option>
                            <option className={this.state.time === "5 - 6" ? clsx(classes.options2, classes.options) :classes.options} name="time" onClick={this.handleTime} value="5 - 6" href="#3">5-6</option>
                            <option className={this.state.time === "7 - 8" ? clsx(classes.options2, classes.options) :classes.options} name="time" onClick={this.handleTime} value="7 - 8" href="#4">7-8</option>
                        </div>
                    </div>
                    <div className={classes.forms}>
                        <label   className={classes.Labels} > Where did you hear about us? </label>
                        <select 
                        name="hear"
                        className=""
                        value={this.state.hear} 
                        onChange={this.handleChange}  
                        onFocus={this.onFocus}
                        onBlur={ this.onBlur}  
                        >
                            <option defaultValue  value="" disabled hidden >  Select </option>
                            <option value="Google" >Google</option>
                            <option value="Facebook" >Facebook</option>
                            <option value="Other"  >Other</option>
                        </select>
                     </div>
                    <button type="submit" className={clsx(classes.Continue, "primary_button")} >Continue</button>
                </form>
                <p className={classes.caption}>By registering here, I agree to PolyMatic’s <span style={{color: "#3584A7"}}>Terms & Conditions </span>and <span style={{color: "#3584A7"}}>Privacy Policy</span></p>
            </div>
        );
    }
}

export default withStyles(styles)(ContactForm);