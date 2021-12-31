import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from '@angular/core'

@Directive({
    selector: '[winning-prime-estimated-cost-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: WinningPrimeEstimatedCostValidatorDirective, multi: true}]
})
export class WinningPrimeEstimatedCostValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        let input = control.value;

        if (input < 0) {
            return {'InvalidWinningPrimeEstimatedCost': true}
        }

        return null;
    }
}