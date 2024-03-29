import { JwtService } from '@nestjs/jwt';

export function getIdFromToken(headerToken: string|undefined): string {
    if (headerToken !== undefined) {
        const jwtService = new JwtService();
        const jwt = headerToken.replace('Bearer ', '');
        const { id } = jwtService.decode(jwt, { json: true }) as { id: string };
        return id;
    }

    return '';
}