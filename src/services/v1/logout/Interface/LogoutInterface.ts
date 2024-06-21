export interface SessionQuery {
    accessToken: string;
    status: number;
    $limit: number;
    driverId?: number;
}
