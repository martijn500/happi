const request = require('request');
const _ = require('lodash');

const startUrl = 'http://192.168.3.118:8080/unlock/';
let doornumber = 1;
let startAnswer;
let finalAnswer;

reset();

function reset() {
  startAnswer = '0';
  finalAnswer = [false];
  setUrlAndPost(startAnswer);
}

function setUrlAndPost(answer) {
  let uri = startUrl + answer;
  console.log('calling uri: ', uri);
  doPost(uri);
}

function doPost(newUri) {
  request({ 
    uri: newUri,
    method: 'PUT',
    headers: {
      'user-name': 'Martijn'
    }
  }, function (error, response, body) {
    if (!error) {
      console.log('server returns: ', body);
      let result = JSON.parse(body);
      // console.log(result);
      if (result.status && result.status === 'SUCCESS' || result.doorNumber !== doornumber) {
        success(result.doorNumber);
      } else {
        console.log('fout! trying again...');
        if (startAnswer.length !== result.codeLength) {
          while (startAnswer.length !== result.codeLength) {
            startAnswer += '0';
            finalAnswer.push(false);
          }
          setUrlAndPost(startAnswer);
        } else {
          changeDigits(startAnswer, result.hint);
        }
      }
    } else {
      console.log('errrrr', error);
    }
  });
}

function changeDigits(answer, hint) {
  console.log('changing digits for: ', answer);
  newAnswer = [];
  motherFuckerStatus = [];
  let motherFuckerMode = true;
  for (let a = 0; a < answer.length; a++) {
    newAnswer[a] = answer[a];
    if (hint[a] === '!') {
      finalAnswer[a] = 'motherfucker';
    }
    if (hint[a] !== '+') {
      newAnswer[a] = parseInt(answer[a], 10) + 1;
    } else {
      finalAnswer[a] = true;
    }
    finalAnswer.forEach(finalVal => {
      if (finalVal === false) {
        motherFuckerMode = false;
      }
    });
  }
  if (motherFuckerMode === true) {
    motherFucker(newAnswer);
  } else {
    console.log("asdfsdfsdfsdfsdf");
    startAnswer = newAnswer.join('');
    setUrlAndPost(startAnswer);
  }
}

function motherFucker(answerSoFar) {
  callList = [];
  for (let a=0; a<finalAnswer.length; a++) {
    if (finalAnswer[a] === 'motherfucker') {
      for(let b=0; b<10; b++) {
        let addToList = _.clone(answerSoFar);
        addToList[a] = b;
        callList.push(addToList);
      }
    }
  }
  console.log('calllist: ', callList);
  callList.forEach(arr => {
    let url = startUrl + arr.join('');
    request({ 
      uri: url,
      method: 'PUT',
      headers: {
        'user-name': 'Martijn'
      }
    }, function (error, response, body) {
      let result = JSON.parse(body);
      // console.log(result);
      if (result.status && result.status === 'SUCCESS' || result.doorNumber !== doornumber) {
        success(result.doorNumber);
      } else {
        console.log("hoi");
      }
    });
  });
  // startAnswer = newAnswer.join('');
}

function success(doorNumber) {
  console.log('goed!!!');
  doornumber = doorNumber;
  reset();
}