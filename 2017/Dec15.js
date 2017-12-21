function judgePairs(start_a, start_b, count){
    var factor_a = 16807;
    var factor_b = 48271;
    var divisor = 2147483647;
    var judge_count = 0;

    var previous_a = start_a;
    var previous_b = start_b;
    for(var i = 0; i < count; i++){
        var next_a = (previous_a*factor_a)%divisor;
        var next_b = (previous_b*factor_b)%divisor;
        var bin_a = next_a.toString(2);
        bin_a = bin_a.substr(bin_a.length - 16);
        var bin_b = next_b.toString(2);
        bin_b = bin_b.substr(bin_b.length - 16);
        /*console.log(next_a+" or "+next_b);
        console.log(bin_a +" or "+bin_b);*/
        if(bin_a.localeCompare(bin_b) == 0){
            judge_count++;
        }
        previous_a = next_a;
        previous_b = next_b;
    }

    return judge_count;
}

console.log(judgePairsComplicated(289, 629, 5000000));

function judgePairsComplicated(start_a, start_b, count){
    var factor_a = 16807;
    var factor_b = 48271;
    var multiple_a = 4;
    var multiple_b = 8;
    var divisor = 2147483647;
    var judge_count = 0;

    var previous_a = start_a;
    var previous_b = start_b;
    var values_a = [];
    var values_b = [];
    var pairs = 0;
    do{
        var next_a = (previous_a*factor_a)%divisor;
        var next_b = (previous_b*factor_b)%divisor;

        if(next_a%multiple_a == 0){
            var bin_a = next_a.toString(2);
            bin_a = bin_a.substr(bin_a.length - 16);
            values_a.push(bin_a);
        }
        if(next_b%multiple_b == 0){
            var bin_b = next_b.toString(2);
            bin_b = bin_b.substr(bin_b.length - 16);
            values_b.push(bin_b);
        }

        if(values_a.length > 0 && values_b.length > 0){
            if(values_a[0].localeCompare(values_b[0]) == 0){
                judge_count++;
            }
            values_a.shift();
            values_b.shift();
            pairs++;
        }
        previous_a = next_a;
        previous_b = next_b;
    }while(pairs < count)

    return judge_count;
}