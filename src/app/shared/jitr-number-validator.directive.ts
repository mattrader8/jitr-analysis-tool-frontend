import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from '@angular/core'

@Directive({
    selector: '[jitr-number-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: JitrNumberValidatorDirective, multi: true}]
})
export class JitrNumberValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        let input = control.value;

        if (input < 0) {
            return {'InvalidJitrNumber': true}
        }

        return null;
    }
}