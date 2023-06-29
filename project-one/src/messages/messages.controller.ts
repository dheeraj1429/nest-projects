import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  NotFoundException,
} from '@nestjs/common';
import { PostMessages } from './messages.interface';
import { CreatePostMessageDto } from './dtos/create-message.dto';
import { MessagesService } from './messages.service';

@Controller('messages')
export class MessagesController {
  constructor(public messagesService: MessagesService) {}

  @Get('/get-all-messages')
  getMessagesList() {
    return this.messagesService.findAll();
  }

  @Get()
  public async getAllMessages(): Promise<PostMessages[]> {
    const postMessages = await fetch(
      'https://jsonplaceholder.typicode.com/posts/1/comments',
    );
    const data = await postMessages.json();
    if (data) {
      return data;
    }
  }

  @Get('/post')
  public async getPostMessage(@Query() query): Promise<PostMessages> {
    const { postId } = query;

    if (postId) {
      const postMessage = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}`,
      );
      const data = await postMessage.json();
      if (data) {
        return data;
      }
    }
  }

  @Get('/:postId')
  public async getMessagesById(
    @Param('postId') id: string,
  ): Promise<PostMessages> {
    const postMessage = await fetch(
      `https://jsonplaceholder.typicode.com/posts/${id}`,
    );
    const data = await postMessage.json();

    if (!data) {
      throw new NotFoundException('Post messages not found!');
    }

    if (data) {
      return data;
    }
  }

  @Post('/')
  public async postMessages(@Body() body: CreatePostMessageDto) {
    console.log(body);
    return body;
  }
}
