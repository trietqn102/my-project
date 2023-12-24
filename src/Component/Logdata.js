import React, { useState } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const day = new Date();
  const tranday = day.toLocaleString();
  const [Pulse ,setPulse] = useState({0:{
    Public: {
      Input: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM",
          Public: "input and output",
        },
        Data: {
          Time: tranday,
          DOA: '',
        },
        Info: {
          author: "M.Triet",
          ver: "9/14/2023",
        },
        Path: {
          db: "data",
          Collection: "data",
        },
      },
      Output: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM",
          Public: "input and output",
        },
        data: {
          Time: null,
          value: {
            Pulse: null,
            position: null,
            area: null,
          },
        },
        Info: {
          author: "M.Triet",
          ver: "9/14/2023",
        },
        Path: {
          db: "data",
          CollectionInput: "data",
        },
      },
      Info: {
        name: "DOA application controls the Robot Arm",
      },
    },
    private: {
      getData: {
        angle: null,
      },
      setData: {
        Pulse: null,
        position: null,
        area: null,
      },
      tempInput: {
        data_temp: null,
        position: null,
        area: null,
      },
      tempOutput: {
        Pulse: null,
        position: null,
        area: null,
      },
      processing: "$MongoDB",
    },
    Personal: {
      Summary: "Thông tin thêm",
      noted: "JSON schema DOA application",
      ver: "14/12/2023",
    },
}})
  const [state, setState] = useState({
    Public: {
      Input: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM",
          Public: "input and output",
        },
        Data: {
          Time: tranday,
          DOA: '',
        },
        Info: {
          author: "M.Triet",
          ver: "9/14/2023",
        },
        Path: {
          db: "data",
          Collection: "data",
        },
      },
      Output: {
        Schema: {
          Personal: "Control Servo",
          Private: "Convert DOA to PWM",
          Public: "input and output",
        },
        data: {
          Time: null,
          value: {
            Pulse: null,
            position: null,
            area: null,
          },
        },
        Info: {
          author: "M.Triet",
          ver: "9/14/2023",
        },
        Path: {
          db: "data",
          CollectionInput: "data",
        },
      },
      Info: {
        name: "DOA application controls the Robot Arm",
      },
    },
    private: {
      getData: {
        angle: null,
      },
      setData: {
        Pulse: null,
        position: null,
        area: null,
      },
      tempInput: {
        data_temp: null,
        position: null,
        area: null,
      },
      tempOutput: {
        Pulse: null,
        position: null,
        area: null,
      },
      processing: "$MongoDB",
    },
    Personal: {
      Summary: "Thông tin thêm",
      noted: "JSON schema DOA application",
      ver: "14/12/2023",
    },
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('> Dữ liệu đã gửi', state);
    axios.post('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/postdata', state);
    // Wait for 1 second before fetching data
    setTimeout(() => {
      fetch('https://us-east-1.aws.data.mongodb-api.com/app/application-0-sznak/endpoint/getdata')
        .then(response => response.json())
        .then(Pulse => {
          // Cập nhật state với dữ liệu người dùng
          setPulse(Pulse);
          console.log('dataaaa : ', Pulse);
        })
        .catch(error => console.error('Error:', error));
    }, 1000); // 1000 milliseconds = 1 second
  };
  const handleChangedata = (event) => {
    setState((prevState) => ({
      ...prevState, 
      Public: {
        ...prevState.Public,
        Input: {
          ...prevState.Public.Input,
          Data: {
            ...prevState.Public.Input.Data,
            DOA: parseFloat(event.target.value),
            Time: tranday,
          },
        },
      },
    }));
  };

  return (
    <>
      <div>
        <label htmlFor="DOA"><h2>Nhập góc :</h2></label>
        <input
          type="number"
          value={state.Public.Input.Data.DOA}
          onChange={(event) => handleChangedata(event)}
        />
        <br />
        <button onClick={(event) => handleSubmit(event)}>RUN</button>
      </div>
      <div>
      <h3>Kết quả</h3>
      <p>Pulse: {Pulse[0].Public.Output.data.value.Pulse}</p>
      <p>Position: {Pulse[0].Public.Output.data.value.position}</p>
      <p>Area: {Pulse[0].Public.Output.data.value.area}</p>
    </div>
    </>
  );
};

export default MyComponent;