import React, {useState} from 'react'

const InputFieldWithVR = () => {
    return (
        <div className="input-group">
            <input
              className={formDetails.subject ? "input valid" : "input"}
              type="text"
              name="subject"
              id="subject"
              value={formDetails.subject}
              onChange={changeHandler}
            />
            <label htmlFor="subject">Subject</label>
            {micShow.mic1 ? (
              <FaMicrophone
                onClick={mic1Handler}
                className="mic1"
              />
            ) : (
              <FaRegStopCircle
              onClick={mic1Handler}
                className="mic1"
              />
            )}
          </div>
    )
}

export default InputFieldWithVR
