import React from 'react'
import { useState } from 'react';
import {IoIosArrowForward, IoIosArrowDown} from 'react-icons/io';
import './style.css'
export default function Advantages() {
    const [bias, setBias] = useState(false);
    const [StandardizedQuestions, setStandardizedQuestions] = useState(false);
    const [scalability, setScalability] = useState(false);
    const [efficiency, setEfficiency] = useState(false);
    const [security, setSecurity] = useState(false);
    const [feedback, setFeedback] = useState(false);
    const [practice, setPractice] = useState(false);

    function handleBias () {
        setBias(!bias);
    }

    function handleStandardizedQuestions () {
        setStandardizedQuestions(!StandardizedQuestions);
    }

    function handleScalability () {
        setScalability(!scalability);
    }

    function handleEfficiency () {
        setEfficiency(!efficiency);
    }
    
    function handleSecurity () {
        setSecurity(!security);
    }

    function handleFeedback () {
        setFeedback(!feedback);
    }

    function handlePractice () {
        setPractice(!practice);
    }

    return (
        <div>
            <h2 className='headingkeyfeatures'>Key Features</h2>
            <div>
                <div onClick={handleBias} className={`adv ${bias ? 'active' : ''}`}>
                    <h3 className='heading'>Bias Reduction</h3>
                    {!bias ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {bias && <p className='text'>AI job interviews help minimize unconscious bias, ensuring a fair evaluation of all candidates, irrespective of their background, gender, or ethnicity.</p>}
                </div>
            </div>
            <div>
                <div onClick={handleStandardizedQuestions} className={`adv ${StandardizedQuestions ? 'active' : ''}`}>
                    <h3 className='heading'>Standardized Questions</h3>
                    {!StandardizedQuestions ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {StandardizedQuestions && <p className='text'>They offer standardized questions, ensuring each candidate is assessed on the same criteria, leading to consistent and objective evaluations.</p>}
                </div>
            </div>
            <div>
                <div onClick={handleScalability} className={`adv ${scalability ? 'active' : ''}`}>
                    <h3 className='heading'>Scalability</h3>
                    {!scalability ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {scalability && <p className='text'>AI interviews are easily scalable, making them suitable for both small and large organizations</p>}
                </div>
            </div>
            <div>
                <div onClick={handleEfficiency} className={`adv ${efficiency ? 'active' : ''}`}>
                    <h3 className='heading'>Efficiency</h3>
                    {!efficiency ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {efficiency && <p className='text'>They save time for both candidates and employers, with automated scheduling, evaluation, and result generation.</p>}
                </div>
            </div>
            <div>
                <div onClick={handleSecurity} className={`adv ${security ? 'active' : ''}`}>
                    <h3 className='heading'>Enhanced Security</h3>
                    {!security ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {security && <p className='text'>Robust security measures are in place to protect candidate data and ensure privacy during the interview process.</p>}
                </div>
            </div>
            <div>
                <div onClick={handleFeedback} className={`adv ${feedback ? 'active' : ''}`}>
                    <h3 className='heading'>Instant Feedback</h3>
                    {!feedback ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    {feedback && <p className='text'>AI provides immediate feedback to candidates, highlighting strengths and areas for improvement, enabling continuous self-improvement.</p>}
                </div>
            </div>
            <div>
                <div onClick={handlePractice} className={`adv ${practice ? 'active' : ''}`}>
                    <h3 className='heading'>Practice Interviews</h3>
                    {!practice ? <p className='arrow'><IoIosArrowForward/></p> : <p className='arrow'><IoIosArrowDown/></p>}
                    <br></br>
                    {practice && <p className='text'>Candidates can use AI interviews to practice and refine their interview skills, gaining confidence for the real thing.</p>}
                  
                </div>
                <br></br>
                    <br></br>
            </div>
        </div>
    )
}