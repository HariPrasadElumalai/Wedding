import React from 'react';
// import { ReactDOM } from 'react';
import TextTransition, { presets } from "react-text-transition";
import images from './Media';
import invi from './Media/Invitation1.jpg';
import aud from './Media/Temple.mp3';
// import left from './left.png';
// import right from './right.png';
import ReactAudioPlayer from 'react-audio-player';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: '15px'
    }
};
class Welcome extends React.Component {

    constructor() {
        super();
        this.state = {
            index: 0,
            texts: [],
            mountImages: false,
            count: 1,
            fadeImages: [],
            showInvitation: false,
            allowSound: false,
            userInput: false
        };
    }

    start() {
        this.setState({
            texts: [
                "வணக்கம்",
                "ഹലോ",
                "నమస్కారం",
                "नमस्ते",
                "Welcome"
            ],
            fadeImages: {}
        });
        setInterval(() =>
            this.setState({
                index: this.state.index + 1
            }),
            2000
        );
        setTimeout(() => {
            this.setState({
                mountImages: true
            });
            setInterval(() => {
                this.setState({
                    count: this.state.count <= 5 ? this.state.count + 1 : 1,
                    fadeImages: images[this.state.count].url
                });

            }, 3000);
        },
            18000
        );
        setTimeout(() => {
            this.setState({
                showInvitation: true
            });
        }, 39000)
    }

    render() {
        // var sound = new Howl({
        //     src: ['./Media/Temple Romance.mp3'],
        //     autoplay: true,
        //     loop: true,
        //     volume: 1.5,
        // });
        return (
            <React.Fragment >
                <Modal
                    isOpen={!this.state.userInput}
                    // onAfterOpen={afterOpenModal}
                    // onRequestClose={this.setState({allowSound:false})}
                    style={customStyles}
                    contentLabel="Music?"
                    overlayClassName="dialogStyles"
                >
                    <div className='dialog'>
                        Proceed with Music?
                    </div>
                    <div className='dialogFlex'>
                        <button className='dialogButton' onClick={
                            () => {
                                this.setState(
                                    {
                                        allowSound: true,
                                        userInput: true
                                    }
                                );
                                this.start();
                            }}>
                            Yes
                        </button>

                        <button className='dialogButton' onClick={
                            () => {
                                this.setState(
                                    {
                                        allowSound: false,
                                        userInput: true
                                    }
                                );
                                this.start();
                            }}>
                            No
                        </button>

                    </div>

                </Modal>
                <div className='welcome' >
                    {/* <div className='leftDecorations'>
                        <img style={{width:"7em"}} src={left} alt='not loaded'></img>
                    </div>
                    <div className='rightDecorations'>
                        <img style={{width:"7em"}} src={right} alt='loaded'></img>
                    </div> */}

                    {
                        this.state.userInput ?
                            this.state.mountImages === false && aud ?
                                <div>
                                    <TextTransition springConfig={presets.molasses}>
                                        <h2>{this.state.texts[this.state.index % this.state.texts.length]}</h2>
                                    </TextTransition>
                                </div>
                                :
                                this.state.showInvitation === false ?
                                    <div className="slide-container">

                                        {
                                            this.state.fadeImages.length ?
                                                <div>
                                                    <img className='imageStyles' src={this.state.fadeImages} alt="load"></img>
                                                </div>
                                                :
                                                <div>
                                                    <img className='imageStyles' src={images[0].url} alt="load"></img>
                                                </div>
                                        }

                                    </div>
                                    :
                                    <div className='container'>
                                        <img className='invitation' src={invi} alt="load"></img>
                                        <div className="text-block">
                                            <p className='welcome'>Welcome</p>
                                            <p className='hh'>Abbirami weds Hariprasad</p>
                                            <p className='details'>Reception: 9th March 2023(6 PM - 8:30 PM)</p>
                                            <p className='details'>Wedding: 10th March 2023(9 AM - 10:30 AM)</p>
                                            <p className='details'>Venue: 13/17, GA Canal Rd, Graham Nagar, Shivaji Nagar, Thanjavur, Tamil Nadu 613001</p>
                                            <p className='details'><a href="https://www.google.co.in/maps/dir//13%2F17,+GA+Canal+Rd,+Graham+Nagar,+Shivaji+Nagar,+Thanjavur,+Tamil+Nadu+613001/@11.1955699,79.0286991,10z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3baab97c91b5989d:0x262a7634757ffa7e!2m2!1d79.1445369!2d10.7779681?hl=en-GB">GMaps</a></p>
                                        </div>
                                    </div>
                            :
                            <>
                            </>
                    }
                    {this.state.allowSound === true ?

                        <ReactAudioPlayer
                            autoPlay={true}
                            src={aud}
                            controls={false}
                            loop={false}
                            preload={true}
                        />

                        :
                        <></>
                    }
                </div>
            </React.Fragment >
        );
    }
}

export default Welcome;