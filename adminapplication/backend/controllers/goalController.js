const { json } = require('body-parser')






//@desc get goals
//@route get /api/goals
// @access Private
const getGoals =   (req,res) => {


    res.status(200).json({message: 'get goals'})

}


//@desc set goals
//@route post /api/goals
// @access Private
const setGoal =   (req,res) => {
    res.status(200).json({message: 'set goals'})

}

//@desc update goals
//@route put /api/goals/id
// @access Private
const updateGoals =  (req,res) => {
    res.status(200).json({message: `update goal ${req.params.id}`})
}







//@desc delete goals
//@route delete /api/goals/id
// @access Private
const deleteGoal = (req,res) => {
    res.status(200).json({message: `delete goal ${req.params.id}`})
}



module.exports = {
    getGoals,setGoal,updateGoals,deleteGoal,
}