import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { CaseManagementService } from './case-management.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { CaseResponseDto, CaseListResponseDto, CaseEventResponseDto, CaseDeadlineResponseDto, CaseTeamMemberResponseDto, PartyResponseDto } from './dto/case-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('case-management')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('cases')
export class CaseManagementController {
  constructor(private readonly caseManagementService: CaseManagementService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new case' })
  @ApiResponse({ status: 201, description: 'The case has been successfully created.', type: CaseResponseDto })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  create(@Body() createCaseDto: CreateCaseDto): Promise<CaseResponseDto> {
    return this.caseManagementService.create(createCaseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all cases with optional filtering' })
  @ApiResponse({ status: 200, description: 'Return all cases.', type: [CaseListResponseDto] })
  @ApiQuery({ name: 'status', required: false, description: 'Filter by case status' })
  @ApiQuery({ name: 'priority', required: false, description: 'Filter by case priority' })
  @ApiQuery({ name: 'search', required: false, description: 'Search in case title and number' })
  @ApiQuery({ name: 'clientId', required: false, description: 'Filter by client ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Filter by filing date range start' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Filter by filing date range end' })
  findAll(@Query() query: any): Promise<CaseListResponseDto[]> {
    return this.caseManagementService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a case by ID' })
  @ApiResponse({ status: 200, description: 'Return the case.', type: CaseResponseDto })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  findOne(@Param('id') id: string): Promise<CaseResponseDto> {
    return this.caseManagementService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a case' })
  @ApiResponse({ status: 200, description: 'The case has been successfully updated.', type: CaseResponseDto })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto): Promise<CaseResponseDto> {
    return this.caseManagementService.update(id, updateCaseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a case' })
  @ApiResponse({ status: 200, description: 'The case has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.caseManagementService.remove(id);
  }

  @Get(':id/events')
  @ApiOperation({ summary: 'Get all events for a case' })
  @ApiResponse({ status: 200, description: 'Return all case events.', type: [CaseEventResponseDto] })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  findEvents(@Param('id') id: string): Promise<CaseEventResponseDto[]> {
    return this.caseManagementService.findEvents(id);
  }

  @Get(':id/deadlines')
  @ApiOperation({ summary: 'Get all deadlines for a case' })
  @ApiResponse({ status: 200, description: 'Return all case deadlines.', type: [CaseDeadlineResponseDto] })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  findDeadlines(@Param('id') id: string): Promise<CaseDeadlineResponseDto[]> {
    return this.caseManagementService.findDeadlines(id);
  }

  @Get(':id/team')
  @ApiOperation({ summary: 'Get team members assigned to a case' })
  @ApiResponse({ status: 200, description: 'Return all team members.', type: [CaseTeamMemberResponseDto] })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  findTeam(@Param('id') id: string): Promise<CaseTeamMemberResponseDto[]> {
    return this.caseManagementService.findTeam(id);
  }

  @Get(':id/parties')
  @ApiOperation({ summary: 'Get all parties involved in a case' })
  @ApiResponse({ status: 200, description: 'Return all case parties.', type: [PartyResponseDto] })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  findParties(@Param('id') id: string): Promise<PartyResponseDto[]> {
    return this.caseManagementService.findParties(id);
  }

  @Post(':id/conflict-check')
  @ApiOperation({ summary: 'Perform conflict of interest check for a case' })
  @ApiResponse({ status: 200, description: 'Return conflict check results.' })
  @ApiResponse({ status: 404, description: 'Case not found.' })
  checkConflicts(@Param('id') id: string) {
    return this.caseManagementService.checkConflicts(id);
  }
}
