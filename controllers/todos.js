const Todo = require('../models/Todo')

module.exports = {
    getTodos: async (req,res)=>{
        console.log(req.user)
        try{
            const todoItems = await Todo.find({userId:req.user.id})
            res.render('todos.ejs', {todos: todoItems, user: req.user})
        }catch(err){
            console.log(err)
        }
    },
    createTodo: async (req, res)=>{
        try{
            const vowels = ['a', 'e', 'i', 'o', 'u']
            const consonants = ['b', 'c', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'w', 'x', 'z']
            const y = 'y'

            const masterNums = [11,22,33]

            const format = (str) => {
                return str.toLowerCase().split('').filter(el=>el!=' ');
            }

            const getLifePath = (dateStr) =>{
                let dateArr = dateStr.replaceAll('-','').split('').map(Number)
                return reductionLoop(dateArr);
            }

            const letterMapper = (letter) => {
                if(letter == 'a' || letter == 'j' || letter == 's'){
                    return 1;
                }else if(letter == 'b' || letter == 'k' || letter == 't'){
                    return 2;
                }else if(letter == 'c' || letter == 'l' || letter == 'u'){
                    return 3;
                }else if(letter == 'd' || letter == 'm' || letter == 'v'){
                    return 4;
                }else if(letter == 'e' || letter == 'n' || letter == 'w'){
                    return 5;
                }else if(letter == 'f' || letter == 'o' || letter == 'x'){
                    return 6;
                }else if(letter == 'g' || letter == 'p' || letter == 'y'){
                    return 7;
                }else if(letter == 'h' || letter == 'q' || letter == 'z'){
                    return 8;
                }else{
                    return 9;
                }
            }

            const vowelOrConsonant = ( word ) => {
                const yExists = word.includes(y)
                const isAtStart = word[0] == y;
                const isAtEnd = word[word.length - 1] == y;
                const letterAfter = word[ word.indexOf(y) + 1 ]
                const letterBefore = word[ word.indexOf(y) - 1 ]

                if( isAtStart && consonants.includes(word[1])){
                  console.log( `${word} Y is a vowel.` );
                  vowels.push(y);
                  return 'y is vowel';
                }else if( isAtEnd && consonants.includes(word[word.length-2])){
                    console.log(`${word} Y is a vowel.`);
                    vowels.push(y);
                    return 'y is vowel';
                }else if( yExists && consonants.includes(letterAfter) && consonants.includes(letterBefore)){
                    console.log(`${word} Y is a vowel.`);
                    vowels.push(y);
                    return 'y is vowel';
                }else if( yExists && consonants.includes(letterAfter) && vowels.includes(letterBefore)){
                    console.log(`${word} Y is a vowel.`);
                    vowels.push(y);
                    return 'y is vowel';
                }else if( yExists && vowels.includes(letterAfter) && consonants.includes(letterBefore)){
                    console.log(`${word} Y is a vowel.`);
                    vowels.push(y);
                    return 'y is vowel';
                }else if( yExists ){
                    console.log( `${word} Y is consonant.` );
                    consonants.push(y);
                    return 'y is consonant';
                }else{
                    console.log( `${word} doesn't include Y.` );
                    return 'no y present';
                }
            }

            const getNums = (arr) => {
                return arr.map(el=>letterMapper(el));
            }

            const getDestiny = (arr) => {
                let letterVals = getNums(arr);
                let totalAll = reductionLoop(letterVals);
                return totalAll;
            }

            const reductionLoop = (arr) => {
                let total = arr.reduce((a,b)=>a+b,0)
                let totalStr = total.toString();
                while(totalStr.length >= 2 && !masterNums.includes(total)){
                    total = totalStr.split('').map(Number).reduce((a,b)=>a+b)
                    totalStr = total.toString();
                }
                return total;
            }

            const getSoul = (arr) => {
                const nameVowels = arr.filter(el=>vowels.includes(el))
                let vowelVals = getNums(nameVowels)
                let totalV = reductionLoop(vowelVals)
                return totalV;
            }

            const getPersonality = (arr) => {
                const nameCons = arr.filter(el=>consonants.includes(el));
                let consVals = getNums(nameCons);
                let totalC = reductionLoop(consVals);
                return totalC;
            }
            
            const getMaturity = (str, dateStr) => {
                const formatted = format(str);
                const dest = getDestiny(formatted);
                const lp = getLifePath(dateStr);
                let newArr = [dest, lp]
                let maturity = reductionLoop(newArr);
                return maturity;
            }
            
            const getBirthday = (dateStr) => {
                let newArr = [];
                let dateArr = dateStr.split('-').map(Number);
                console.log(dateArr);
                newArr.push(dateArr.at(2));
                let bday = reductionLoop(newArr);
                return bday;
            }

            const getCurrentName = (str) => {
                const formatted = format(str);
                return getDestiny(formatted);
            }

            const getKarmicLessons = (arr) => {
                const letterVals = getNums(arr);
                const nums = [1,2,3,4,5,6,7,8,9];
                let newArr = [];

                for (let val of letterVals){
                    if(!newArr.includes(val)){
                        newArr.push(val);
                    }
                }
                for (let num of newArr){
                    let index = nums.indexOf(num);
                    if (index !== -1){
                        nums.splice(index,1);
                    }
                }
                if(nums.length === 0){
                    return ['none'];
                }
                return nums;
            }

            await Todo.create({todo: req.body.todoItem, 
                lifePath: getLifePath(req.body.birthDate), 
                yTest: req.body.todoItem.toLowerCase().split(' ').map(el=>vowelOrConsonant(el)),
                destiny: getDestiny(format(req.body.todoItem)),
                soul: getSoul(format(req.body.todoItem)),
                personality: getPersonality(format(req.body.todoItem)),
                maturity: getMaturity(req.body.todoItem, req.body.birthDate),
                birthday: getBirthday(req.body.birthDate),
                currentName: getCurrentName(req.body.currentName),
                karmicLessons: getKarmicLessons(format(req.body.todoItem)),
                vowels: format(req.body.todoItem).filter(el=>vowels.includes(el)),
                consonants: format(req.body.todoItem).filter(el=>consonants.includes(el)),
                userId: req.user.id})
            console.log('New name has been added!')
            res.redirect('/todos')
        }catch(err){
            console.log(err)
        }
    },
    // markComplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: true
    //         })
    //         console.log('Marked Complete')
    //         res.json('Marked Complete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    // markIncomplete: async (req, res)=>{
    //     try{
    //         await Todo.findOneAndUpdate({_id:req.body.todoIdFromJSFile},{
    //             completed: false
    //         })
    //         console.log('Marked Incomplete')
    //         res.json('Marked Incomplete')
    //     }catch(err){
    //         console.log(err)
    //     }
    // },
    deleteTodo: async (req, res)=>{
        console.log(req.body.todoIdFromJSFile)
        try{
            await Todo.findOneAndDelete({_id:req.body.todoIdFromJSFile})
            console.log('Deleted Todo')
            res.json('Deleted It')
        }catch(err){
            console.log(err)
        }
    }
}    