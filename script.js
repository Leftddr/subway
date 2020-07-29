document.addEventListener('DOMContentLoaded', function() {

    var subway_url = "http://swopenapi.seoul.go.kr/api/subway/sample/xml/realtimeStationArrival/1/";
    var bus_url = "http://swopenapi.seoul.go.kr/api/subway/sample/xml/busStation/1/";
    var bus_trans = "http://swopenapi.seoul.go.kr/api/subway/sample/xml/busLineToTransfer/1/";

    function processing1(){
        getData().then(function(data){
            var updnLine = data.getElementsByTagName("updnLine");
            var trainLineNm = data.getElementsByTagName("trainLineNm");
            var subwayHeading = data.getElementsByTagName("subwayHeading");
            var arv1Msg2 = data.getElementsByTagName("arvlMsg2");
            var arv1Msg3 = data.getElementsByTagName("arvlMsg3");

            if(updnLine.length == 0){
                document.querySelector("#result").innerHTML = "<p> 결과가 존재하지 않습니다 </p>";
                return;
            }
            
            var result = '';

            for(let i = 0 ; i < updnLine.length ; i++){
                result += '<div style="border:solid 1px">'
                if(updnLine[i] == undefined) break;
                result += '<p style="font-size:10px"> 상/하행 : ' + updnLine[i].childNodes[0].nodeValue + '</p>';
                if(trainLineNm[i] == undefined) break;
                result += '<p style="font-size:10px"> 방향 : ' + trainLineNm[i].childNodes[0].nodeValue + '</p>';
                if(subwayHeading[i] == undefined) break;
                result += '<p style="font-size:10px"> 방향 : ' + subwayHeading[i].childNodes[0].nodeValue + '</p>';
                if(arv1Msg2[i] == undefined) break;
                result += '<p style="font-size:10px"> 남은 시간 : ' + arv1Msg2[i].childNodes[0].nodeValue + '</p>';
                if(arv1Msg3[i] == undefined) break;
                result += '<p style="font-size:10px"> 위치 : ' + arv1Msg3[i].childNodes[0].nodeValue + '</p>';
                result += '</div>';
            }

            document.querySelector("#result").innerHTML = result;

        }).catch(function(data){
            alert(data);
        })
    }

    function getData(){
        return new Promise(function(resolve, reject){
            if(document.querySelector("#subNm").value == ""){
                alert("지하철 역명 입력하세요");
                return;
            }
            var url = subway_url + document.querySelector("#sel").value + '/' + document.querySelector("#subNm").value;
            $.ajax({
                url:url,
                method:'GET',
                success:function(data){
                    resolve(data);
                },
                error:function(error){
                    reject(error);
                }
            })
        })
    }

    function processing2(){
        busData().then(function(data){
            var sttnId = data.getElementsByTagName("sttnId");
            var sttnnm = data.getElementsByTagName("sttnnm");

            if(sttnnm.length == 0){
                alert("결과가 존재하지 않습니다");
                return;
            }

            var result = '';
            for(let i = 0 ; i < sttnId.length ; i++){
                result += '<div style="border:solid 1px">';
                result += '<p style="font-size:10px"> 버스정류장 아이디 : ' + sttnId[i].childNodes[0].nodeValue + '</p>';
                result += '<p style="font-size:10px"> 버스정류장 이름 : ' + sttnnm[i].childNodes[0].nodeValue + '</p>';
                result += '</div>';
            }

            document.querySelector("#result").innerHTML = result;            
        }).catch(function(error){
            alert(error);
        })
    }

    function busData(){
        return new Promise(function(resolve, reject){
            if(document.querySelector("#subNm").value == ""){
                alert("지하철 역명 입력하세요");
                return;
            }
            var url = bus_url + document.querySelector("#sel").value + '/' + document.querySelector("#subNm").value;
            $.ajax({
                url:url,
                method:'GET',
                success:function(data){
                    resolve(data);
                },
                error:function(error){
                    reject(error);
                }
            })
        })
    }

    function processing3(){
        busTrans().then(function(data){
            var rtnm = data.getElementsByTagName("rtnm");
            var fstallctm = data.getElementsByTagName("fstallctm");
            var lstallctm = data.getElementsByTagName("lstallctm");

            if(rtnm.length == 0){
                alert("결과가 존재하지 않습니다");
                return;
            }

            var result = '';
            for(let i = 0 ; i < rtnm.length ; i++){
                result += '<div style="border:solid 1px">';
                result += '<p style="font-size:10px"> 버스 노선 : ' + rtnm[i].childNodes[0].nodeValue + '</p>';
                result += '<p style="font-size:10px"> 운행시작 시간 : ' + fstallctm[i].childNodes[0].nodeValue + '</p>';
                result += '<p style="font-size:10px"> 운행종료 시간 : ' + lstallctm[i].childNodes[0].nodeValue + '</p>';
                result += '</div>';
            }

            document.querySelector("#result").innerHTML = result; 

        }).catch(function(error){
            alert(error);
        })
    }

    function busTrans(){
        return new Promise(function(resolve, reject){
            if(document.querySelector("#subNm").value == ""){
                alert("지하철 역명 입력하세요");
                return;
            }
            var url = bus_trans + document.querySelector("#sel").value + '/' + document.querySelector("#subNm").value; 
            $.ajax({
                url:url,
                method:'GET',
                success:function(data){
                    resolve(data);
                },
                error:function(error){
                    reject(error);
                }
            })
        })
    }

    document.querySelector("#btn_sub").addEventListener('click', function(){
        document.querySelector("#result").innerHTML = "";
        processing1();
    });

    document.querySelector("#btn_bus").addEventListener('click', function(){
        document.querySelector("#result").innerHTML = "";
        processing2();
    });

    document.querySelector("#btn_trans").addEventListener('click', function(){
        document.querySelector("#result").innerHTML = "";
        processing3();
    })
});