import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class GraphqlAuthGuard implements CanActivate{
    constructor(
        private jwtService: JwtService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = context.getArgByIndex(2);
        const request = ctx.req;
        const token = this.extractToken(request);
        if(!token){
            throw new UnauthorizedException('Unauthorized');
        }
        try {
            const payload = this.jwtService.verifyAsync(token, {
                publicKey: process.env.JWT_PUBLIC_KEY,
                algorithms: ['RS256']
            });
            request['profile'] = payload;
        }catch(e){
            throw new UnauthorizedException('Unauthorized');
        }
        return true;
    }
    private extractToken(request: Request): string | undefined {
        return request.headers.authorization?.replace('Bearer ', '')

    }
}