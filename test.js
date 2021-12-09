function Test() {

}

Test.name = 'cxm'
Test.getName = () => {
  console.log('getName');
}

console.log(Test.getName());