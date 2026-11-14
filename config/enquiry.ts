/** What a visitor can say they're interested in. Shared by the contact form and its validation. */
export const enquiryInterests = ["Full career program", "A single learning track", "Corporate / team training", "Something else"] as const;

export type EnquiryInterest = (typeof enquiryInterests)[number];

export const enquiryStatuses = ["NEW", "CONTACTED", "CLOSED"] as const;
