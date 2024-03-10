import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function checkEmail():ValidatorFn{
    return (control:AbstractControl):ValidationErrors|null=>{
        if(control.value!=""){
            if(control.value.charAt(0)==="0"||control.value.charAt(0)==="1"||control.value.charAt(0)==="2"||control.value.charAt(0)==="3"||control.value.charAt(0)==="4"||control.value.charAt(0)==="5"||control.value.charAt(0)==="6"||control.value.charAt(0)==="7"||control.value.charAt(0)==="8"||control.value.charAt(0)==="9"){
                return {'invalidEmail':true}
            }
            else{
                return null;
            }
        }
        else{
            return null;
        }
    }
}