import { JitrOrganization } from "./jitr-organization.model";
import { JitrRating } from "./jitr-rating.model";
import { JitrStatus } from "./jitr-status.model";

export class Jitr {
    jitrNumber: number;
    jitrDate: Date;
    numberOfFTE: number;
    jitrStatus: JitrStatus;
    jitrRating: JitrRating;
    praxisEstimatedCost: number;
    winningPrimeEstimatedCost: number;
    jitrOrganization: JitrOrganization;
}