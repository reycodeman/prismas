import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // 🔍 Busca as roles exigidas no método OU no controller
    const requiredRoles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true; // Se nenhuma role é exigida, qualquer usuário autenticado pode acessar
    }

    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.role) {
      throw new ForbiddenException('Usuário não autenticado ou sem papel definido');
    }

    // 🔒 Verifica se o papel do usuário está entre os permitidos
    const hasRole = requiredRoles.includes(user.role);
    if (!hasRole) {
      throw new ForbiddenException(
        `Acesso negado: esta rota é restrita a ${requiredRoles.join(', ')}`,
      );
    }

    return true;
  }
}
