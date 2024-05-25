function validateEmail(email: string): boolean{
    const validarEmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return validarEmailRegex.test(email);
}

console.log(validateEmail("leomoriva@gmail.com"));
console.log(validateEmail("mail@invalido"));
