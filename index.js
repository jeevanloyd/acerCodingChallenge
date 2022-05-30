
// This code and logic works good for 2 input (2 chemicals) and n combinations(max to 20 for now).
// Steps for logic:
//1. Get unique values for chemical 1 (1,2,3) and if not unique test failed.
// 2. Once step 1 is successful, check for repeated values in chemical 2 and check if count is 3 for a uinque particalar value.
// 3. compare it aganist one of the combination set.

$(document).ready(function () {
    var combinationCount;
    var chemicalCount;
    var resultArray = [];

    var chemical1 = []
    var chemical2 = []
    var combination = [[[1,1],[2,1],[3,1]],[[1,2],[2,2],[3,2]],[[1,3],[2,3],[3,3]]]


    $("#generateTable").on("click", function () {
        $("#dynamicTable").empty();
        chemicalCount = $("#chemicalCount").val();

        combinationCount = $("#combinationCount").val();
        checmicalRowIndex = combinationCount + 1;
        var html = '<table class="table table-bordered" id="chemicalTable">';
        for (i = 0; i <= combinationCount; i++) {
            if (i == 0) {
                html += "<tr>";
            } else {
                html += '<tr class="checmicalRow">';
            }

            for (j = 0; j < chemicalCount; j++) {
                let count = j;
                if (i == 0) {
                    html += "<th>Chemical #" + (count + 1) + "</th>";
                } else {
                    html +=
                        '<td><input type="number" id="chemicalVal" min ="1" max="' +
                        (parseInt(chemicalCount) + 1) +
                        '"></td>';
                }
            }
            html += "</tr>";
        }

        $("#dynamicTable").append(html);
    });

    $("#compareCombination").on("click", function () {
        chemical1= []
        chemical2 = []
        $(document)
            .find(".checmicalRow")
            .each(function (index, tr) {
                
                var tempArr = [];
                $(this)
                    .find("input")
                    .each(function (index, tr) {
                        
                        tempArr.push(parseInt($(this).val()));
                        if( index % 2 == 0 ){
                            chemical1.push($(this).val())
                        }
                        else{
                            chemical2.push($(this).val())
                        }

                    });
                resultArray.push(tempArr);
            });
            compareChemicalCombination(resultArray,chemical1,chemical2)
    });

    function compareChemicalCombination(resultArray,checical1,checmical2){
        let uniqueChemicalOne = checkConditionOne(checical1)
        if(uniqueChemicalOne){
            var chemical2ArrayCount = getArrayCount(checmical2)
            let countArray = [];
            for (var key in chemical2ArrayCount) {
                if(chemical2ArrayCount[key] >= 3){
                    let count = getMatchinCount(resultArray,combination[parseInt(key) - 1])
                    countArray.push(parseInt(count))
                }
            }
            if( countArray.includes(3)){
                alert("Correct")
            }
            else{
                alert("Incorrect")
            }
        }
        else{
            alert("Incorrect")
        }
    }


    function  getMatchinCount(resultArray,combination){
        var tempCount = 0
        for(i = 0 ; i < resultArray.length; i++){

            for(j = 0 ; j < combination.length; j++){
                
                if( JSON.stringify(resultArray[i]) === JSON.stringify(combination[j])){
                    
                    tempCount++;
                    break;
                }
        
            }
        }
        return tempCount;
    }

    // chemical#1 1,2,3
    function checkConditionOne(checical1){
        let found;
        if( checical1.includes('1') && checical1.includes('2') && checical1.includes('3')){
            found = true;
        }
        else{
            found = false;
        }

        return found;
    }

    function getArrayCount(sampleArray){
        const counts = {};
        sampleArray.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
        return counts;
    }
    
});
