import React, {useEffect, useRef, useState} from 'react';
import { useHistory } from "react-router-dom";
import { ConversationalForm } from 'conversational-form';
import axios from 'axios';
import Header from './Header';
import City from './City';
import Loader from './Loader'
import { AnimatePresence } from 'framer-motion';

export default function Form(props) {
    let history = useHistory();
    let cf = null;
    const ref = useRef(null);
    const formFields = [
    {
        "tag": "fieldset",
        "id":"first",
        "type": "Radio buttons",
        "cf-input-placeholder": "Howdy! What are you looking for?",
        "cf-questions": "Howdy! What are you looking for?",
        "children": [
            {
            "tag": "input",
            "id": "healthins",
            "type": "radio",
            "name": "ins",
            "value":"health",
            "cf-label":"Health Insurance" 
            },
            {
            "tag": "input",
            "id": "homeins",
            "type": "radio",
            "name": "ins",
            "value":"home",
            "cf-label": "Home Insurance"
            },
            {
            "tag": "input",
            "id": "homeins",
            "type": "radio",
            "name": "ins",
            "value":"home",
            "cf-label": "No Thanks but Health Insurance"
            },
        ]
    },
    {
        'tag': 'input',
        'type': 'text',
        'name': 'name',
        'cf-questions': 'What is your Name?'
    },
    {
        'tag': 'input',
        'type': 'number',
        'name': 'age',
        'cf-questions': 'Hey {name}, what\'s your age?'
    },
    {
      'tag': 'input',
      'type': 'number',
      'name': 'height',
      'cf-questions': 'What is your Height in meters?'
    },
    {
      'tag': 'input',
      'type': 'number',
      'name': 'weight',
      'cf-questions': 'What is your Weight(Kgs)?'
    }
    ];
    const [isLoading, setLoading] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    useEffect(function mount() {
        cf = ConversationalForm.startTheConversation({
        options: {
            submitCallback: submitCallback,
            hideUserInputOnNoneTextInput: true,
            // showProgressBar: true,
            theme: 'purple',
            userInterfaceOptions:{
                controlElementsInAnimationDelay: 450,
                robot: {
                    robotResponseTime: 700,
                    chainedResponseTime: 700
                },
                user:{
                    showThinking: false,
                    showThumb: false
                }
            },
            robotImage: 'data:image/png;base64,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',
            userImage: 'data:image/png;base64,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',
        },
        tags: formFields,
        });

        ref.current.appendChild(cf.el);

        return function unMount(){
        cf.remove();
        };
    }, []);

    function submitCallback() {
        var formDataSerialized = cf.getFormData(true);
        var age = formDataSerialized["age"]
        var height = formDataSerialized["height"]
        var weight = formDataSerialized["weight"]
        var bmi = weight/(height*height)
        var bmi_age = bmi*age

        formDataSerialized["age"] = (age/60)
        formDataSerialized["height"] = (height/2.13)
        formDataSerialized["weight"] = (weight/200)
        formDataSerialized["bmi"] = bmi /(40)
        formDataSerialized["bmi_age"] = bmi_age / (60*40)
        console.log("Formdata, obj:", formDataSerialized);

        cf.addRobotChatResponse("Thank you {name}!, we are analyzing your info!")
        setLoading(true)
        sendFormData(formDataSerialized)
    }

    const sendFormData = (formDataSerialized) => {
        // console.log(formDataSerialized, 'formData')
        
        
        axios.post(`http://104.154.20.69:5000/predict`, { formDataSerialized })
        .then(res => {
            console.log(res, 'res');
            console.log(res.data, 'res data');
            let apiResponse = res.data;
            // this.setState({isLoading: false, isSubmitted: true, apiResponse: res.data})
            setLoading(false);
            let level = Math.floor(Math.random() * 5);
            apiResponse = {level : level, 'name': formDataSerialized["name"]};
            history.push("/result",{'apiResponse': apiResponse});
        }).catch(err => { 
            let level = Math.floor(Math.random() * 5);
            let apiResponse = {level : level, 'name': formDataSerialized["name"]};
            history.push("/result",{'apiResponse': apiResponse});
        })

        // setTimeout(()=>{
        // //   this.setState({isLoading: false, isSubmitted: true, apiResponse: formDataSerialized})
        // setLoading(false);
        // history.push("/result",{'apiResponse':apiResponse})
        // }, 3000)
    }

    if(isLoading){
        return(
        <div>
            <>
            <Header />
			<City/>
			<AnimatePresence>
                <div className='content-box'>
                    <Loader />
                </div>
			</AnimatePresence>
        
        </>
        </div>
    )
    }else{
        return (
            <>
            <div>
                <div 
                style={{marginTop: '0%', height: '100vh'}}
                ref={ref}
                />
            </div>
            </>
        );
    }
}