import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CatModule } from 'modules/cat/cat.module';
import { PrismaModule } from 'prisma/prisma.module';
import { TrainersModule } from 'modules/trainers/trainers.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      formatError: (error: any) => {
        const graphQLFormattedError = {
          message: error.extensions?.originalError?.message || error.message,
          code: error.extensions?.code || 'SERVER_ERROR',
        };
        return graphQLFormattedError;
      },
    }),

    PrismaModule,
    CatModule,
    TrainersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
