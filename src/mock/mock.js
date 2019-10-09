import Mock from 'mockjs'

Mock.mock('http://localhost:8080/user',{
    'name':'@name',
    'email':'@email',
    'age|1-10':5
    //其他数据
});
Mock.mock('http://localhost:8080/menu',{
    'id':'@increment',
    'name':'menu',
    'order|10-20':12
    //其他数据
})