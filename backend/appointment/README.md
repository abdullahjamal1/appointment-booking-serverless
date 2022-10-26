AdServer Service
==============

<p align="center">
    <img alt="Platform architecture diagram" src="images/ad-server.png"/>
</p>

### VAST ad tag URL parameters
Ref: [https://support.google.com/admanager/answer/10678356?hl=en](https://support.google.com/admanager/answer/10678356?hl=en)

Parameter | Details 
------------------------------------------------- |---------------------------------------------------------------------------------
sid <small>(Session ID)</small> | The session ID parameter accepts a variable value which is a privacy-preserving advertising identifier that is used for frequency capping purposes only.  Per the [IAB's IFA guidelines](https://iabtechlab.com/wp-content/uploads/2018/12/OTT-IFA-guidelines.final_Dec2018.pdf), this parameter must be populated in UUID format.                       You can opt out of passing the session ID by setting sid=0.
