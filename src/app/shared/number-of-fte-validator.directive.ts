import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from '@angular/core'

@Directive({
    selector: '[number-of-fte-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: NumberOfFTEValidatorDirective, multi: true}]
})
export class NumberOfFTEValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        let input = control.value;

        if (input < 1) {
            return {'InvalidNumberOfFTE': true}
        }

        return null;
    }
}