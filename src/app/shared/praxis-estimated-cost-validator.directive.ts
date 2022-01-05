import { AbstractControl, NG_VALIDATORS, Validator } from "@angular/forms";
import { Directive } from '@angular/core'

@Directive({
    selector: '[praxis-estimated-cost-validator]',
    providers: [{ provide: NG_VALIDATORS, useExisting: PraxisEstimatedCostValidatorDirective, multi: true}]
})
export class PraxisEstimatedCostValidatorDirective implements Validator {

    validate(control: AbstractControl): {[key: string]: any} | null {

        let input = control.value;

        if (input < 0) {
            return {'InvalidPraxisEstimatedCost': true}
        }

        return null;
    }
}